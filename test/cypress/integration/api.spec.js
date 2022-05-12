/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe('API requests', () => {
  beforeEach(() => {
    cy.request(
      {
        url: 'https://xn--bad-tma.com/eventitems.json'
      }).as('events')
  })

  it('should return calendar#events items', () => {
    cy.get('@events')
      .should((response) => {
        expect(response.body).to.have.ownProperty('items')
      })
  })
})
