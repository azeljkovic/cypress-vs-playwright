import object from '../../fixtures/xstate.json';

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
        cy.get('[data-test="transaction-create-amount-input"]').type('5');
        cy.get('[data-test="transaction-create-description-input"]').type('big bucks');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.wait('@transaction').should(({ request, response }) => {
            expect(response.statusCode).to.equals(200);
            expect(response.body.transaction.status).to.equals("complete");
        });
    });

    it('stub the response', () => {
        cy.intercept('POST', '/transactions',
            {
                statusCode: 500,
                body: { error: "Server error!" },
                delayMs: 50,
            }).as('transaction');

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
        cy.get('[data-test="transaction-create-amount-input"]').type('5');
        cy.get('[data-test="transaction-create-description-input"]').type('big bucks');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.wait('@transaction');
        cy.get(".MuiAlert-message").should("have.text", "Error occurred, please try again later!")
    });
});
