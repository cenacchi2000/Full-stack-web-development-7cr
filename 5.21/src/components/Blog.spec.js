describe('Blog app', function() {
    // ...
  
    describe('When logged in and after creating blog', function() {
      beforeEach(function() {
        cy.contains('log in').click()
        cy.get('input:first').type('munazzahaslam')
        cy.get('input:last').type('sala90qw!')
        cy.get('#login-button').click()

        cy.contains('Create new blog').click()
        cy.get('#title').type('Test Blog by Cypress')
        cy.get('#author').type('Munnazzah Aslam')
        cy.get('#url').type('www.testblog.com')
        cy.contains('Create').click()
        cy.get('html').contains('Test Blog by Cypress')
        cy.get('html').contains('Munnazzah Aslam')
        cy.get('html').contains('www.testblog.com')
      })
  
      it('User can delete his blog', function() {
        cy.contains('Remove').click()
        cy.get('window:confirm').contains('Remove blog you are NOT gonna need it! By Munnazzah Aslam')
        cy.on('window:confirm', ()=>{
            cy.get('button').click()
            cy.get(html).should('not contain', 'Test Blog by Cypress')
        } )
      })
    })
  
  })