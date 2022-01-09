describe('Blog app', function () {
  cy.get('#loginForm').should('be.visible');

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('input:first').type('munazzahaslam')
      cy.get('input:last').type('sala90qw!')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test Blog by Cypress')
      cy.get('#author').type('Munnazzah Aslam')
      cy.get('#url').type('www.testblog.com')
      cy.contains('Create').click()
      cy.get('html').contains('Test Blog by Cypress')
      cy.get('html').contains('Munnazzah Aslam')
      cy.get('html').contains('www.testblog.com')
    })
  })

})