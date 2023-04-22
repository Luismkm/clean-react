import faker from 'faker';
import * as FormHelper from '../support/form-helper';
import * as Http from '../support/login-mocks';

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Valor inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Valor inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Credenciais inválidas');
    FormHelper.testUrl('/login');
  });

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    cy.getByTestId('spinner').should('not.exist');
    FormHelper.testUrl('/login');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    FormHelper.testUrl('/login');
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOK();
    simulateValidSubmit();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    FormHelper.testUrl('/');
    FormHelper.testLocalStorageItem('accessToken');
  });

  it('Should present multiple submits', () => {
    Http.mockOK();
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').dblclick();
    FormHelper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    Http.mockOK();
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');
    FormHelper.testHttpCallsCount(0);
  });
});
