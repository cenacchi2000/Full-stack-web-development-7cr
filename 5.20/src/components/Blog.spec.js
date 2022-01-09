describe('Blog app', function() {
    // ...
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('log in').click()
        cy.get('#username').type('munazzahaslam')
        cy.get('#password').type('sala90qw!')
        cy.get('#login-button').click()
      })
  
      it('User can like a blog', function() {
        cy.contains('Test Blog by Cypress')
        .contains('like')
        .click()

      cy.contains('Test Blog by Cypress')
        .contains('1 like')
      })
    })
  
  })