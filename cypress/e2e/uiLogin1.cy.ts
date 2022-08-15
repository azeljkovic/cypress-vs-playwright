describe('simple test', () => {
  it('login via UI', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('[data-test="signin-username"]').type('Katharina_Bernier');
    cy.get('[data-test="signin-password"]').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();
  });
});

