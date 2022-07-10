const loginSelectors = require("../../fixtures/selectors/login.json");
const mainSelectors = require("../../fixtures/selectors/main.json");

describe('simple test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('login via UI', () => {
    cy.get(loginSelectors.username).type(Cypress.env('username'));
    cy.get(loginSelectors.password).type(Cypress.env('password'), {log: false});
    cy.get(loginSelectors.submit).click();
    cy.get(mainSelectors.usernameLabel).should('have.text', `@${Cypress.env('username')}`);
  });
});

