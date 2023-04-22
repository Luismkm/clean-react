/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to select DOM element by data-test-id attribute.
     * @example cy.getDataTestId('greeting')
     */
    getByTestId(id: string): Chainable<JQuery<Element>>
  }
}

Cypress.Commands.add('getByTestId', (id: string) => cy.get(`[data-testid="${id}"]`));
