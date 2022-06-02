export const getGreeting = () => cy.get('h1');

export function signupFormFill(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  if (firstName) {
    cy.get('[data-test="signup-control-input-first-name"]')
      // cy.get('[data-test="signup-control-first-name"] > .mat-form-field-wrapper > .mat-form-field-flex')
      // cy.get('[data-test="signup-control-first-name"] > label > input')
      .clear()
      .type(firstName);
  } else {
    cy.get('[data-test="signup-control-input-first-name"]').clear();
  }

  if (lastName) {
    cy.get('[data-test="signup-control-input-last-name"]')
      .clear()
      .type(lastName);
  } else {
    cy.get('[data-test="signup-control-input-last-name"]').clear();
  }

  if (email) {
    cy.get('[data-test="signup-control-input-email"]').clear().type(email);
  } else {
    cy.get('[data-test="signup-control-input-email"]').clear();
  }

  if (password) {
    cy.get('[data-test="signup-control-input-password"]')
      .clear()
      .type(password);
  } else {
    cy.get('[data-test="signup-control-input-password"]').clear();
  }
}
