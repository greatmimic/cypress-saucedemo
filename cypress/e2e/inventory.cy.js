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

    it('', () => {
        
    })

})