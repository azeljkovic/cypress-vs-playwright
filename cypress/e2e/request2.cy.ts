import object from '../fixtures/xstate.json';
import notificationsObj from '../fixtures/notifications.json';
import selectors from '../fixtures/selectors/main.json';

describe('API requests', () => {
  it('intercept request', () => {
    cy.intercept('POST', '/transactions').as('transaction');

    // login via API
    cy.request('POST', 'http://localhost:3001/login', {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    });
    localStorage.setItem('authState', JSON.stringify(object));

    cy.visit('/signin');
    cy.get(selectors.newTransactionButton).click();
    cy.get(selectors.usersList).children().should('have.length', 4);
    cy.get(selectors.usersList).children().eq(2).click();
    cy.get(selectors.transactionAmount).type('5');
    cy.get(selectors.transactionDescription).type('big bucks');
    cy.get(selectors.submitTransactionButton).click();

    cy.wait('@transaction').should(({ response }) => {
      expect(response.statusCode).to.equals(200);
      expect(response.body.transaction.status).to.equals('complete');
    });

    cy.get(selectors.transactionSuccessMessage).should('have.text', 'Transaction Submitted!');
  });

  it('stub the response', () => {
    cy.intercept('GET', '/notifications', {
      statusCode: 200,
      body: notificationsObj,
      delayMs: 50,
    }).as('notifications');

    // login via API
    cy.request('POST', 'http://localhost:3001/login', {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    });
    localStorage.setItem('authState', JSON.stringify(object));

    cy.visit('/signin');
    cy.wait('@notifications');
    cy.get(selectors.notificationsBadge).should('have.text', '99+');
  });
});
