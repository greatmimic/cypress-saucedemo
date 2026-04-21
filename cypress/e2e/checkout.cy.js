describe('Checkout tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
    })

    // bug in checkout process, checkout is possible without items in the cart
    it.skip('Test if checkout is possible with no items', () => {
        cy.checkout('firstName', 'lastName', '12345')
        cy.get('[data-test="finish"]').click()
        // assertion expected to fail
        cy.get('[data-test="checkout-complete-container"]').should('not.be.visible')
        
    })
    
    it('Test if all fields are required to create an order', () => {
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="continue"]').click()
        cy.get('.error-message-container').should('be.visible')
    })

    // bug in checkout process, checkout is possible without valid input in field
    it.skip('Test if valid input is required per field on checkout', () => {
        cy.checkout(12345, 67890, 'not a postal code')
        cy.get('[data-test="finish"]').click()
        // assertion expected to fail
        cy.get('[data-test="checkout-complete-container"]').should('not.be.visible')
    })

    it('Check if **SINGLE** item put into cart is properly shown with correct subtotal', () => {
        cy.get('[data-test="inventory-item-name"]').eq(0).invoke('text').as('itemName')
        cy.get('[data-test="inventory-item-price"]').eq(0).invoke('text').as('itemPrice')
        cy.get('[data-test="inventory-item"]').eq(0).within(() => {
            cy.get('[data-test^="add-to-cart"]').click()
        })

        cy.checkout('firstName', 'lastName', '12345')
        cy.get('.cart_item_label').should('be.visible')
        
        cy.get('@itemName').then((name) => {
            cy.get('[data-test="inventory-item-name"]').invoke('text').should('equal', name)
        })

        cy.get('@itemPrice').then((price) => {
            cy.get('[data-test="subtotal-label"]').invoke('text')
            .then((subtotal) => {
                const index = subtotal.indexOf('$')
                const subtotalPrice = subtotal.slice(index)
                expect(price).to.equal(subtotalPrice)
            })
        })
    })
    
    it('Check if **MULTIPLE** items put into cart is properly shown with correct subtotal', () => {
        
        // returns item names as array
        cy.get('[data-test="inventory-item-name"]').then(($els) => {
            return Cypress._.map($els, (el) => el.textContent)
        })
        .then((names) => {
            const nameArray = [...names]
            return nameArray
        })
        .as('names')

        // returns item prices as total, parseFloat and added 
        cy.get('[data-test="inventory-item-price"]').then(($els) => {
            return Cypress._.map($els, (el) => el.textContent)
        })
        .then((prices) => {
            const price1 = parseFloat(prices[0].slice(1))
            const price2 = parseFloat(prices[1].slice(1))
            return price1 + price2
            
        })
        .as('total')

        // add items into cart
        cy.get('[data-test="inventory-item"]').eq(0).within(() => {
            cy.get('[data-test^="add-to-cart"]').click()
        })
        cy.get('[data-test="inventory-item"]').eq(1).within(() => {
            cy.get('[data-test^="add-to-cart"]').click()
        })

        // checkout and make sure label is visible
        cy.checkout('firstName', 'lastName', '12345')
        cy.get('.cart_item_label').should('be.visible')

        // get aliases and assert both names and subtotal
        cy.then(function() {
            cy.get('[data-test="inventory-item-name"]').eq(0).should('have.text', this.names[0])
            cy.get('[data-test="inventory-item-name"]').eq(1).should('have.text', this.names[1])

            cy.get('[data-test="subtotal-label"]').invoke('text')
            .then((subtotal) => {
                const index = subtotal.indexOf('$')
                const subtotalPrice = parseFloat(subtotal.slice(index+1))         
                expect(this.total).to.equal(subtotalPrice)
            })
        })
    })

    it('Check if cancel on /checkout-step-two returns user to /inventory and /checkout-step-one returns user to /cart', () => {
        cy.checkout('firstName', 'lastName', '12345')
        cy.get('[data-test="cancel"]').click()
        cy.url().should('include', '/inventory')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="cancel"]').click()
        cy.url().should('include', '/cart')
    })
})