/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Calendar routes', () => {
  const routesToSelector = {
    // calendar selector for gregorian cal
    '/#/calendar/gregorian': '.calendar',
    // calendar selector for badi cal
    '/#/calendar/badi': '.calendar-badi'
  }
  const urls = Object.keys(routesToSelector)

  urls.forEach((url) => {
    it(`should render page on ${url}`, () => {
      cy.visit(url)

      const selector = routesToSelector[url]
      expect(selector, `selector for ${url}`).to.be.a('string')

      cy.get(selector)
        .should('be.visible')
    })
  })
})
