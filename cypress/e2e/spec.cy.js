describe('Start Page', () => {
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

describe('"What is your name?" Page', () => {
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
  it("Continue button links to question page 'What is your postcode?' when required fields are filled", () => {
    cy.visit('/what-is-your-name')
    cy.get('[data-cy="first-name"]').type('Kitty')
    cy.get('[data-cy="surname"]').type('Moon')
    cy.get('[data-cy="continue-button"]').click()
    cy.url().should('include', '/what-is-your-postcode')
  })
  it("Continue button links to same page when required fields are not filled", () => {
    cy.visit('/what-is-your-name')
    cy.get('[data-cy="continue-button"]').click()
    cy.url().should('include', '/what-is-your-name')
  })
  it("Continue button shows same page with error messages when required fields are not filled", () => {
    cy.visit('/what-is-your-name')
    cy.get('[data-cy="continue-button"]').click()
    cy.get('[data-cy="first-name-error-message"]')
    cy.get('[data-cy="surname-error-message"]')
  })
})

describe('"What is your postcode?" Page', () => {
  it("Loads successfully", () => {
    cy.visit('/what-is-your-postcode')
  })
  it("Has title with 'confirm your identity'", () => {
    cy.visit('/what-is-your-postcode')
    cy.get('title').should('contain', 'Confirm your identity')
  })
  it("Has heading with 'What is your postcode?'", () => {
    cy.visit('/what-is-your-postcode')
    cy.get('[data-cy="page-heading"]').should('contain', 'What is your postcode?')
  })
})