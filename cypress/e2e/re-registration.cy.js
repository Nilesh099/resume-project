describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
    cy.get("#loginPanel > p:nth-child(3) > a").click();
    cy.get("input[id='customer.firstName']").type("John");
    cy.get("input[id='customer.lastName']").type("Doe");
    cy.get("input[id='customer.address.street']").type("123 Main St");
    cy.get("input[id='customer.address.city']").type("Anytown");
    cy.get("input[id='customer.address.state']").type("Delhi");
    cy.get("input[id='customer.address.zipCode']").type("12345");
    cy.get("input[id='customer.phoneNumber']").type("555-123-4567");
    cy.get("input[id='customer.ssn']").type("123-45-6789");
    cy.get("input[id='customer.username']").type("johndoe");
    cy.get("input[id='customer.password']").type("password123");
    cy.get("#repeatedPassword").type("password123");
    cy.get('[colspan="2"] > .button').click();
    cy.get("span[id='customer.username.errors']").should('have.text', "This username already exists.");
  });
});
