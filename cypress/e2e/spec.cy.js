describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm')
    cy.get('input[name="username"]').type('nrmahajan99');
    cy.get('input[name="password"]').type('nielsj389#u37483%##%#');
    // cy.get('button[type="submit"]').click();
  })
})