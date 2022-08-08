import object from '../../fixtures/xstate.json';
import notificationsObj from'../../fixtures/notifications.json';

describe('API requests', () => {
    it('intercept request', () => {
        cy.intercept('POST', '/transactions').as('transaction');

        // login via API
        cy.request('POST', 'http://localhost:3001/login', {
            password: 's3cret',
            remember: true,
            type: 'LOGIN',
            username: 'Katharina_Bernier',
        });
        localStorage.setItem("authState", JSON.stringify(object));

        cy.visit('http://localhost:3000');
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="users-list"]').children().should('have.length', 4);
        cy.get('[data-test="users-list"]').children().eq(2).click();
        cy.get('#amount').type('5');
        cy.get('#transaction-create-description-input').type('big bucks');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.wait('@transaction').should(({ request, response }) => {
            expect(response.statusCode).to.equals(200);
            expect(response.body.transaction.status).to.equals("complete");
        });
    });

    it('stub the response', () => {
        cy.intercept('GET', '/notifications',
            {
                statusCode: 200,
                body: notificationsObj,
                delayMs: 50,
            }).as('notifications');

        // login via API
        cy.request('POST', 'http://localhost:3001/login', {
            password: 's3cret',
            remember: true,
            type: 'LOGIN',
            username: 'Katharina_Bernier',
        });
        localStorage.setItem("authState", JSON.stringify(object));

        cy.visit('http://localhost:3000');
        cy.wait('@notifications');
        cy.get('[data-test="nav-top-notifications-count"] > .MuiBadge-badge').should('have.text', '99+')
    });
});
