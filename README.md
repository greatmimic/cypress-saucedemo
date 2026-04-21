# Cypress Practice — Sauce Demo
 
End-to-end test suite built with [Cypress](https://www.cypress.io/) targeting [Sauce Demo](https://www.saucedemo.com), a demo e-commerce app designed for testing practice.
 
---

## Project Structure
 
```
cypress/
├── e2e/
│   ├── auth.cy.js
│   ├── inventory.cy.js
│   ├── cart.cy.js
│   ├── checkout.cy.js
│   └── navigation.cy.js
├── fixtures/
│   └── users.json
└── support/
    └── commands.js
```
 
---
 
## Test Cases
 
### Authentication
 
| Test Case | Type |
|---|---|
| Login with valid credentials | E2E |
| Login with invalid password | Negative |
| Login with empty fields | Negative |
| Locked out user sees error message | Negative |
| Successful logout | E2E |
| Cannot access inventory page without login | Security |
 
### Product Inventory
 
| Test Case | Type |
|---|---|
| All products are displayed after login | Smoke |
| Each product shows name, price, and image | UI |
| Sort by price low to high | Functional |
| Sort by price high to low | Functional |
| Sort by name A to Z | Functional |
| Sort by name Z to A | Functional |
 
### Cart
 
| Test Case | Type |
|---|---|
| Adding a product updates cart badge count | Functional |
| Adding multiple products reflects correct count | Functional |
| Removing a product from inventory page updates badge | Functional |
| Cart page shows correct items added | E2E |
| Removing an item inside the cart removes it from list | Functional |
| Cart is empty after all items removed | Functional |
 
### Checkout
 
| Test Case | Type |
|---|---|
| Checkout requires at least one item | Negative |
| Checkout step 1 requires all fields filled | Negative |
| Valid checkout info proceeds to step 2 | E2E |
| Order summary shows correct items and total | Functional |
| Completing order shows confirmation screen | E2E |
| Cancel on step 1 returns to cart | Functional |
| Cancel on step 2 returns to inventory | Functional |
 
### Navigation
 
| Test Case | Type |
|---|---|
| Clicking a product opens its detail page | Functional |
| Back button on product detail returns to inventory | Functional |
| Burger menu opens and closes | UI |
| Reset app state clears cart | Functional |
 
---

## Known Bugs

### Empty cart checkout
- **Expected**: User should be blocked from checking out with an empty cart
- **Actual**: Order completes successfully with no items
- **Test**: `checkout.cy.js` — "Test if checkout is possible with no items"
- **Status**: Failing (intentional)

### Invalid input in customer info field
- **Expected**: User should be blocked from checking out with invalid input
- **Actual**: Order completes successfully with invalid customer info
- **Test**: `checkout.cy.js` — "Test if valid input is required per field on checkout"
- **Status**: Failing (intentional)