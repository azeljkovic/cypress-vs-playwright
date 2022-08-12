describe('make API requests', () => {
  it('basic API request', () => {
    cy.request('POST', 'http://localhost:3001/login', {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    });
  });

  it('API login test', () => {
    cy.request('POST', 'http://localhost:3001/login', {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.body.user.email).to.eq(Cypress.env('email'));
    });
  });
});
