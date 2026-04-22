describe('Navigation tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
    })

    it('Check if clicking on an item shows details page and "Back to products" send you back to inventory', () => {
        cy.get('[data-test="inventory-item"]').eq(0).within(() => {
            cy.get('[data-test="inventory-item-name"]').click()
        })
        cy.get('[data-test="inventory-item-desc"]').should('be.visible')
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('include', '/inventory')
    })

    it('Check if burger menu functions on click', () => {
        cy.get('.bm-burger-button').click()
        cy.get('.bm-item-list').should('be.visible')
        cy.get('.bm-cross-button').click()
        cy.get('.bm-item-list').should('not.be.visible')
    })

    it('Reset app state clears cart', () => {
        cy.get('[data-test="inventory-item"]').eq(0).within(() => {
            cy.get('[data-test^="add-to-cart"]').click()
        })
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
        cy.get('.bm-burger-button').click()
        cy.get('[data-test="reset-sidebar-link"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })

})