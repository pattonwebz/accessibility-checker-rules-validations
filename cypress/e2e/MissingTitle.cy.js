describe('Checking Missing Title', () => {

	it('has issues', () => {
		let key = 'Missing Title';

		cy.checkIssues(key);
	});
});
