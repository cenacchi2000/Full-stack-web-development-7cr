describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Munazzah Aslam',
      username: 'munazzahaslam',
      password: 'sala90qw!'
    }
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginForm').should('be.visible');
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('munazzahaslam')
      cy.get('#password').type('sala90qw!')
      cy.get('#login-button').click()

      cy.get(html).contains('Munazzah Aslam logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('munazzahaslam')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Invalid password or user does not exist')
      cy.get('.error').should('have.css', 'color', 'red')
      cy.get('.error').should('have.css', 'border', '2px solid red')

      cy.get(html).should('not contain', 'Munazzah Aslam logged in')
    })
  })
})