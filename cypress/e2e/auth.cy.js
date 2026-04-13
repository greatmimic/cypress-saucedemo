describe('Authentication tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    const ERRORS = {
        LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
        INVALID_LOGIN: 'Epic sadface: Username and password do not match any user in this service',
        USERNAME_REQUIRED: 'Epic sadface: Username is required',
        PASSWORD_REQUIRED: 'Epic sadface: Password is required',
        URL_MANGLE: 'Epic sadface: You can only access \'/inventory.html\' when you are logged in.'
    }

    it('Check for successful login and logout with valid credentials', () => {
        cy.login('standard_user', 'secret_sauce')
        //check url path for inventory page
        cy.url().should('include', '/inventory.html')
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        //check succesful logout
        cy.url().should('equal', 'https://www.saucedemo.com/')
    })

    //does checking for exact text of error msg make sense? can't it be replaced with a test to see if error msg exists?
    it('Check for error message with invalid password, invalid login, empty fields', () => {
        cy.login('standard_user', 'notapassword')
        cy.get('[data-test="error"]').should('be.visible').then(($error) => {
            const errorText = $error.text()
            expect(errorText).to.eq(ERRORS.INVALID_LOGIN)
        })

        cy.reload()
        cy.get('[data-test="error"]').should('not.exist')
        
        cy.login('notauser', 'secret_sauce')
        cy.get('[data-test="error"]').should('be.visible').then(($error) => {
            const errorText = $error.text()
            expect(errorText).to.eq(ERRORS.INVALID_LOGIN)
        })
        cy.reload()
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').then(($error) => {
            const errorText = $error.text()
            expect(errorText).to.eq(ERRORS.USERNAME_REQUIRED)
        })
    })

    it('Check for locked user unable to login', () => {
        cy.login('locked_out_user', 'secret_sauce')
        cy.get('[data-test="error"]').should('be.visible').then(($error) => {
            const errorText = $error.text()
            expect(errorText).to.eq(ERRORS.LOCKED_OUT)
            
        })
    })

    it('Check for url mangling to access inventory page without logging in', () => {
        cy.visit('/inventory.html', {failOnStatusCode: false}) //ignore 404 to see error msg on page
        cy.url().should('equal', 'https://www.saucedemo.com/')
        cy.get('[data-test="error"]').should('be.visible').then(($error) => {
            const errorText = $error.text()
            expect(errorText).to.eq(ERRORS.URL_MANGLE)
        })
    })

    

})