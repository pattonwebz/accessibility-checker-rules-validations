describe('Checking for Missing Form Labels', () => {

	it('has issues', () => {
		let key = 'Missing Form Label';

		cy.checkIssues(key);
	});
});
