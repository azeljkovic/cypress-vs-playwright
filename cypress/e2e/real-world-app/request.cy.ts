describe('make API requests', () => {
  it('basic API request', () => {
    cy.request('POST', 'http://localhost:3001/login', {
      password: 's3cret',
      username: 'Katharina_Bernier',
    });
  });

  it('API login test', () => {
    cy.request('POST', 'http://localhost:3001/login', {
      password: 's3cret',
      username: 'Katharina_Bernier',
    }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.body.user.email).to.eq('Norene39@yahoo.com');
    });
  });
});
