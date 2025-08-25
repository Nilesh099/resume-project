describe("My First Test", () => {
  it("Login registration user", () => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
    cy.get("#loginPanel > form > d:nth-child(3) > a").click();
   
  });
});
