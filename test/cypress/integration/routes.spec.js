/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Calendar routes', () => {
  const routesToSelector = {
    // calendar selector for gregorian cal
    '/calendar/gregorian': '.calendar',
    // calendar selector for badi cal
    '/calendar/badi': '.calendar-badi'
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

describe('Calendar routes', () => {
  it('should render the month view for Gregorian calendar', () => {
    const headerSelector = 'calendar-header'
    const expectedMonth = 'October 2023'

    cy.visit('/calendar/gregorian/month/2023/10/1')

    cy.dataCy(headerSelector)
      .should('be.visible')
      .and('include.text', expectedMonth)
  })

  it('should render the month view for Badi calendar', () => {
    const headerSelector = 'calendar-header'
    const expectedMonth = '(Will) 180'

    cy.visit('/calendar/badi/month/180/11/15')

    cy.dataCy(headerSelector)
      .should('be.visible')
      .and('include.text', expectedMonth)
  })
})
