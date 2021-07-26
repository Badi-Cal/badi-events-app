/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

const { DateTime } = require('luxon')

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

describe('Navigation header', () => {
  let now = DateTime.now()
  beforeEach(() => {
    cy.visit('/')
  })

  it('should move time one period forward', () => {
    const testDate = now.plus({ month: 1 }).monthLong
    cy.get('.calendar-header-right > button').click()
    cy.dataCy('calendar-header')
      .contains(testDate).should('exist')
  })

  it('should move time one period backwards', () => {
    const testDate = now.plus({ month: -1 }).monthLong
    cy.get('.calendar-header-left > button').click()
    cy.dataCy('calendar-header')
      .contains(testDate).should('exist')
  })
})
