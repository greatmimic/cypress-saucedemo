describe('Cart function tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
    })

    it('Check if Add to Cart increments count of cart badge and remove decrements count', () => {
        cy.get('[data-test^="add-to-cart"]').first().click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
        cy.get('[data-test^="add-to-cart"]').first().click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')
        cy.get('[data-test^="remove-sauce-labs"]').first().click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
    })
    
    // what to do for multiple items?
    it('Cart page shows correct item that was added', () => {
        cy.get('[data-test="inventory-item-name"]').first().invoke('text').as('itemName')
        // add Sauce Labs Backpack
        cy.get('[data-test^="add-to-cart"]').first().click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('@itemName').then((name) => {
           cy.get('[data-test="inventory-item-name"]').invoke('text').should('deep.equal', name)
        })
    })

    it.only('Check if removing an item in the cart removes the item from the cart page', () => {
        // scope button click within parent item to avoid index shifting
        // caused by "Add to Cart" mutating to "Remove" after click
        cy.get('[data-test="inventory-item"]').eq(0).within(() => {
            cy.get('[data-test^="add-to-cart"]').click()
        })
        cy.get('[data-test="inventory-item"]').eq(1).within(() => {
            cy.get('[data-test^="add-to-cart"]').click()
        })

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').eq(0).within(() => {
            cy.get('[data-test^="remove"]').click()
        })
        cy.get('[data-test="inventory-item"]').should('have.length', 1)
    })

})