describe('Checking for images with missing alt text', () => {

	it('has issues', () => {
		let key = 'Image Missing Alternative Text';

		cy.checkIssues(key);
	});
});
