describe('Checking for Broken ARIA References', () => {

	it('has issues', () => {
		let key = 'Broken ARIA Reference';

		cy.checkIssues(key);
	});
});
