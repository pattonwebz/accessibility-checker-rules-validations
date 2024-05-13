describe('Checking for Empty Table Headers', () => {

	it('has issues', () => {
		let key = 'Empty Table Header';

		cy.checkIssues(key);
	});
});
