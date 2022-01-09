describe('Checks that the blogs are ordered according to likes with the blog with the most likes being first', () => {
    it('Testing Likes Functionality', () => {
        cy.get('.blog').then($elements => {
            const likes = [...$elements].map(el => el.likes)
            expect(likes).to.deep.equal([...likes].sort())
        })
    })
})