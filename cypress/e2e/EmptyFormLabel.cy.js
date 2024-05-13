describe('Checking for Empty Form Labels', () => {

	it('has issues', () => {
		let key = 'Empty Form Label';

		cy.checkIssues(key);
	});
});
