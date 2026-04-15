describe('Inventory tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
    })

    // all products are displayed after login
    it('Check that all products are displayed after login', () => {
        cy.get('[data-test="inventory-item"]').should('have.length', 6)

        // check each product has name, description, image, price, and add to cart button 
        cy.get('[data-test="inventory-item"]').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('[data-test="inventory-item-name"]').should('be.visible')
                cy.get('[data-test="inventory-item-desc"]').should('be.visible')
                cy.get('[data-test="inventory-item-price"]').should('be.visible')
                cy.get('[data-test*="img"]').should('be.visible')
                cy.get('[data-test^="add-to-cart"]').should('be.visible')
            })
        })
    })

    it('Test product sort A to Z', () => {

        // test a-z
        cy.get('[data-test="product-sort-container"]').select('az')

        cy.get('[data-test="inventory-item-name"]').then(($els) => {
            return Cypress._.map($els, (el) => el.textContent)
        })
        .then((names) => {
            const sorted = [...names].sort()
            expect(names).deep.equal(sorted)
        }) 
    })
    
    it('Test product sort Z to A', () => {
        // test z-a
        cy.get('[data-test="product-sort-container"]').select('za')

        cy.get('[data-test="inventory-item-name"]').then(($els) => {
            return Cypress._.map($els, (el) => el.textContent)
        })
        .then((names) => {
            const sorted = [...names].sort().reverse()
            expect(names).deep.equal(sorted)
        })
    })

    it('Test product sort price low to high', () => {
        // test low - hi
        cy.get('[data-test="product-sort-container"]').select('lohi')

        cy.get('[data-test="inventory-item-price"]').then(($els) => {
            return Cypress._.map($els, (el) => el.textContent)
        })
        .then((prices) => {
            return prices.map((price) => {
                const stripped = price.slice(1)
                return parseFloat(stripped)
            })
        })
        .then((priceArray) => {
            const sorted = [...priceArray].sort((a,b) => a - b )
            expect(priceArray).deep.equal(sorted)
        })
    })
        
    it('Test product sort price high to low', () => {
        // test hi - low
        cy.get('[data-test="product-sort-container"]').select('hilo')

        cy.get('[data-test="inventory-item-price"]').then(($els) => {
            return Cypress._.map($els, (el) => el.textContent)
        })
        .then((prices) => {
            return prices.map((price) => {
                const stripped = price.slice(1)
                return parseFloat(stripped)
            })
        })
        .then((priceArray) => {
            const sorted = [...priceArray].sort((a,b) => b - a )
            expect(priceArray).deep.equal(sorted)
        })
    })
        


    })


        
 

