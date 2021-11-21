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
        .contains(month).should('exist')
        .contains(year).should('exist')
    })
  })

  it('should expect .calendar-day-number-current to contain today', () => {
    cy.dataCy('calendar-content').within(($content) => {
      datetime = DateTime.local()
      today = datetime.get('day').toString()
      cy.get('.calendar-day-number-current')
        .should(($div) => {
          const text = $div.text().trim()
          expect(text).to.equal(today)
        })
    })
  })

  it('should expect Sunday to have class .calendar-day-weekend', () => {
    cy.dataCy('calendar-content').within(($content) => {
      datetime = DateTime.local()
      weekday = datetime.weekday
      weekend = datetime.plus({ days: (7 - weekday) }).get('day').toString()
      cy.contains(weekend)
        .parent()
        .parent()
        .should('have.class', 'calendar-day-weekend')
    })
  })
})
