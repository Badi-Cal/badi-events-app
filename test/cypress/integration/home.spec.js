/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

const { DateTime } = require('luxon')

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

describe('Calendar index page', () => {
  let month,
    weekday,
    weekend,
    datetime,
    year,
    today
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render document <title>', () => {
    cy.title().should('include', 'Badí')
  })

  it('should expect that .calendar-header exists in DOM', () => {
    cy.dataCy('q-app').then(($app) => {
      cy.log('App container: ', $app)
      datetime = DateTime.local()
      month = datetime.monthLong
      year = datetime.year
      cy.dataCy('calendar-header')
        .should('include.text', month)
        .should('include.text', year)
    })
  })

  it('should expect .calendar-day-number-today to contain today', () => {
    cy.dataCy('calendar-content').within(($content) => {
      datetime = DateTime.local()
      today = datetime.get('day').toString()
      cy.get('.calendar-day-number-today')
        .should(($div) => {
          const text = $div.text().trim()
          expect(text).to.equal(today)
        })
    })
  })

  it('should expect day of Sunday to have correct day number', () => {
    cy.dataCy('calendar-content').within(($content) => {
      datetime = DateTime.local()
      weekday = datetime.weekday
      // get the day of Sunday
      weekend = datetime.minus({ days: (weekday % 7) }).get('day').toString()
      cy.get('.calendar-day-weekend > .calendar-day-number > .inner-span')
        .should('include.text', weekend)
    })
  })
})
