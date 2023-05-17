/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

const { MoveDates } = require('@daykeep/calendar-core/demo')

describe('Parsed event data', () => {
  let $description
  const routes = [
    '/calendar/gregorian',
    '/calendar/badi'
  ]

  beforeEach(() => {
    cy.fixture('events')
      .then((events) => {
        const moveDates = { eventArray: events, ...MoveDates.methods }
        moveDates.moveSampleDatesAhead()
        const responseData = {
          items: moveDates.eventArray
        }

        cy.intercept(
          {
            hostname: 'xn--bad-tma.com',
            pathname: '/eventitems.json'
          },
          (req) => {
            req.reply(
              {
                statusCode: 200,
                body: responseData
              })
          }).as('getEvents')
      })
  })

  routes.forEach((url) => {
    it(`${url} should render event summary for today`, () => {
      cy.visit(url)
      cy.get('.calendar-day-today')
        .find('[data-cy=calendar-day-content]').within(($content) => {
          $description = 'Multi-day test #36-2'
          cy.get('.calendar-event-summary')
            .should('include.text', $description)
        })
    })
  })
})
