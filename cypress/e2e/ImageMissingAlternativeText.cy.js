describe('Checking for images with missing alt text', () => {

	it('has issues', () => {
		let key = 'Image Missing Alternative Text';

		cy.loginAndActivate();

		cy.fixture('errors.json').then((data) => {
			const issueData = data[key];
			cy.recheckAndShowDetails(issueData.postId);
			cy.get('.edac-details .edac-details-rule-title h3').contains(key).find('.edac-details-rule-count').invoke('text').then((text) => {
				assert(text === issueData.count, key + ' should have ' + issueData.count + ' issues');
			});
			cy.get('.edac-details .edac-details-rule-title h3').contains(key).scrollIntoView();
		});
	});
});
