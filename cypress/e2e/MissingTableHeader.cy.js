describe('Checking for Missing Table Headers', () => {

	it('has issues', () => {
		let key = 'Missing Table Header';

		cy.checkIssues(key);
	});
});
