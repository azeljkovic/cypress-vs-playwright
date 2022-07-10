import loginSelectors from '../../fixtures/selectors/login.json';
import mainSelectors from '../../fixtures/selectors/main.json';

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

