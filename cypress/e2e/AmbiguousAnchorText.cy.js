describe('Checking Ambiguous Anchor Text', () => {

	it('has issues', () => {
		let key = 'Ambiguous Anchor Text';

		cy.checkIssues(key);
	});
});
