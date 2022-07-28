describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Index Page Test', () => {
  it("Loads successfully", () => {
    cy.visit('/') // fails if not running server
  })

  it('Takes us to html page', () => {
    cy.visit('/')
    cy.contains('HTML').click() // click on the part element that contains HTML
    cy.url().should('include', '/html') // new page URL should include '/html'
  })
  it('Takes us to nunjucks page', () => {
    cy.visit('/')
    cy.contains('NUNJUCK').click()
    cy.url().should('include', '/nunjuck')
  })
})
