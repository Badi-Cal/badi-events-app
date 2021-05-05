/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

const { DateTime } = require('luxon')

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

describe('Calendar index page tests', () => {
  let month
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render document <title>', () => {
    cy.title().should('include', 'Badí')
  })

  it('should expect that .calendar-header exists in DOM', () => {
    cy.dataCy('q-app').then(($app) => {
      cy.log('App container: ', $app)
      month = new DateTime.now().monthLong
      cy.dataCy('calendar-header')
        .contains(month).should('exist')
    })
  })
})
