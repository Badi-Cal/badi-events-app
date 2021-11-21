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
    const testDate = now.plus({ month: 1 }).endOf('month')
    // get Sunday of the week
    const duration = (testDate.weekday === 7) ? 0 : testDate.weekday
    const testWeekEnd = testDate.minus({ days: duration })
    cy.get('.calendar-header-right > button').click()
    cy.dataCy('calendar-header')
      .contains(testDate.monthLong).should('exist')
    // get first weekend day in last week of month
    cy.dataCy('calendar-content')
      .children().last()
      .find('.calendar-day-weekend').first()
      .should(($div) => {
        const text = $div.text().trim()
        expect(text).to.equal(testWeekEnd.day.toString())
      })
  })

  it('should move time one period backwards', () => {
    const testDate = now.plus({ month: -1 }).endOf('month')
    const duration = (testDate.weekday === 7) ? 0 : testDate.weekday
    const testWeekEnd = testDate.plus({ days: duration })
    cy.get('.calendar-header-left > button').click()
    cy.dataCy('calendar-header')
      .contains(testDate.monthLong).should('exist')
    // get first weekend day in last week of month
    cy.dataCy('calendar-content')
      .children().last()
      .find('.calendar-day-weekend').first()
      .should(($div) => {
        const text = $div.text().trim()
        expect(text).to.equal(testWeekEnd.day.toString())
      })
  })
})
