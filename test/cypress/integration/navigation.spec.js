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
    const testDate = now.plus({ month: 1 })
    // luxon week starts on Monday
    const testWeekEnd = testDate.endOf('month').startOf('week').minus({ days: 1 })
    cy.get('.calendar-header-right > button').click()
    cy.dataCy('calendar-header')
      .contains(testDate.monthLong).should('exist')
    // get first weekend day in last week of month
    cy.dataCy('calendar-content')
      .children().last()
      .find('.calendar-day-weekend').first()
      .contains(testWeekEnd.day).should('exist')
  })

  it('should move time one period backwards', () => {
    const testDate = now.plus({ month: -1 })
    const testWeekEnd = testDate.endOf('month').startOf('week').minus({ days: 1 })
    cy.get('.calendar-header-left > button').click()
    cy.dataCy('calendar-header')
      .contains(testDate.monthLong).should('exist')
    // get first weekend day in last week of month
    cy.dataCy('calendar-content')
      .children().last()
      .find('.calendar-day-weekend').first()
      .contains(testWeekEnd.day).should('exist')
  })
})
