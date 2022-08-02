describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

// describe('Index Page Test', () => {
//   it('Takes us to html page', () => {
//     cy.visit('/')
//     cy.contains('HTML').click() // click on the part element that contains HTML
//     cy.url().should('include', '/html') // new page URL should include '/html'
//   })
//   it('Takes us to nunjucks page', () => {
//     cy.visit('/')
//     cy.contains('NUNJUCK').click()
//     cy.url().should('include', '/nunjuck')
//   })
//   it('Takes us to spacecats page', () => {
//     cy.visit('/')
//     cy.contains('SPACECATS').click()
//     cy.url().should('include', '/spacecats')
//   })
// })

describe('Start Page Test', () => {
  it("Loads successfully", () => {
    cy.visit('/') // fails if not running server
  })
  it("Has title with 'confirm your identity'", () => {
    cy.visit('/')
    cy.get('title').should('contain', 'Confirm your identity')
  })
  it("Has heading with 'confirm your identity'", () => {
    cy.visit('/')
    cy.get('[data-cy="page-heading"]').should('contain', 'Confirm your identity')
  })
  it("Links to an examples page", () => {
    cy.visit('/')
    cy.get('[data-cy="examples-page-link"]').click()
    cy.url().should('include', '/proof-of-id-checklist')
  })
  it("Start button links to question page 'What is your name?'", () => {
    cy.visit('/')
    cy.get('[data-cy="start-button"]').click()
    cy.url().should('include', '/what-is-your-name')
  })
})

describe('"What is your name?" Page Test', () => {
  it("Loads successfully", () => {
    cy.visit('/what-is-your-name') // fails if not running server
  })
  it("Has title with 'confirm your identity'", () => {
    cy.visit('/what-is-your-name')
    cy.get('title').should('contain', 'Confirm your identity')
  })
  it("Has heading with 'What is your name?'", () => {
    cy.visit('/what-is-your-name')
    cy.get('[data-cy="page-heading"]').should('contain', 'What is your name?')
  })
})