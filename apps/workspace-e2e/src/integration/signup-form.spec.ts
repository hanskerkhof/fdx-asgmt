import { signupFormFill } from '../support/app.po';

describe('workspace', () => {
  beforeEach(() => cy.visit('/'));

  it('should show all validation messages on submit empty form', () => {
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="signup-control-first-name-error-message"]').should(
      'contain',
      'Please enter first your name'
    );
    cy.get('[data-test="signup-control-last-name-error-message"]').should(
      'contain',
      'Please enter your last name'
    );
    cy.get('[data-test="signup-control-email-error-message"]').should(
      'contain',
      'Email is required'
    );
    cy.get('[data-test="signup-control-password-error-message"]').should(
      'contain',
      'Password is required'
    );
  });

  it('should show all the password validation errors', () => {
    signupFormFill('Anna', 'Nas', 'anna@nas.com', '12aB');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="signup-control-password-error-message"]').should(
      'contain',
      'Please use alphabetic characters only (A-z)'
    );

    signupFormFill('Anna', 'Nas', 'anna@nas.com', 'annaznas');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="signup-control-password-error-message"]').should(
      'contain',
      'The password may not contain your first or last name'
    );
    signupFormFill('Anna', 'Nas', 'anna@nas.com', 'Aannaaaa');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="signup-control-password-error-message"]').should(
      'contain',
      'The password may not contain your first or last name'
    );

    signupFormFill('Anna', 'Nas', 'anna@nas.com', 'xyznAsxyz');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="signup-control-password-error-message"]').should(
      'contain',
      'The password may not contain your first or last name'
    );

    signupFormFill('Anna', 'Nas', 'anna@nas.com', '');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="signup-control-password-error-message"]').should(
      'contain',
      'Password is required'
    );
    cy.get('[data-test="signup-form"]').should('have.class', 'ng-invalid');
  });

  it('should display error on failed api call', () => {
    cy.intercept('POST', 'https://demo-api.now.sh/users', {
      statusCode: 500,
    }).as('errorApi');
    signupFormFill('Anna', 'Nas', 'anna@nas.com', 'AbcDefGH');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="btn-try-again"]').should('be.visible');
    cy.get('[data-test="message-error"]').should(
      'contain',
      'Something went wrong'
    );
  });

  it('should submit the form and show success', () => {
    signupFormFill('Anna', 'Nas', 'anna@nas.com', 'AbcDefGH');
    cy.get('[data-test="signup-control-submit"]').click({ force: true });
    cy.get('[data-test="btn-signup-again"]').should('be.visible');
    cy.get('[data-test="message-success"]').should('contain', 'Success');
  });

  it('should submit form on enter key and show success', () => {
    signupFormFill('Anna', 'Nas', 'anna@nas.com', 'AbcDefGH');
    cy.get('[data-test="signup-control-input-password"]').type('abc{enter}');
    cy.get('[data-test="btn-signup-again"]').should('be.visible');
    cy.get('[data-test="message-success"]').should('contain', 'Success');
  });
});
