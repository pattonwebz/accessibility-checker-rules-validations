// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAndActivate', (username, password) => {
	username = username || Cypress.env('username');
	password = password || Cypress.env('password');
	cy.session(
		[username, password],
		() => {
			cy.visit(Cypress.config('baseUrl') + '/wp-login.php');
			cy.wait(50);
			cy.get('#user_login').should('be.visible').should('be.enabled').type(username);
			cy.get('#user_pass').should('be.visible').should('be.enabled').type(password);
			// sometimes the type starts too fast, make a 2nd attempt if it's not filled properly.
			cy.get('#user_login').invoke('val').then((val) => {
				if (val !== username) {
					cy.get('#user_login').clear();
					cy.get('#user_login').type(username);
				}
			});
			cy.get('#wp-submit').click();
			cy.url().should('contain', '/wp-admin')
		},
		{
			validate() {
				cy.request(Cypress.config('baseUrl') + '/wp-admin').its('status').should('eq', 200);
			},
			cacheAcrossSpecs: true,
		},
	)
	cy.visit(Cypress.config('baseUrl') + '/wp-admin');
})

Cypress.Commands.add('recheckAndShowDetails', (postID) => {
	cy.visit(Cypress.config('baseUrl') + '/wp-admin/post.php?post=' + postID + '&action=edit');

	// let the page have a second to get ready
	cy.wait(200)

	// if the gutenberg welcome modal is displayed, close it
	cy.document().then((doc) => {
		const welcomeModal = doc.querySelector('.components-modal__screen-overlay');
		if (welcomeModal) {
			cy.get('.components-modal__header button[aria-label="Close"]').click();
		}
	});

	// find button that says 'Update' and click it
	cy.get('.editor-post-publish-button').click();
	// wait till a success message is displayed
	// allow this to take up to 10 seconds
	cy.get('.components-snackbar__content', { timeout: 10000 }).should('contain', 'Post updated');

	cy.intercept('GET', Cypress.config('baseUrl') + '/wp-admin/admin-ajax.php?action=edac_readability_ajax*').as('readabilityScanResults');
	cy.wait('@readabilityScanResults', { timeout: 10000 });
	// TODO: consider not waiting and instead watching for the 'edac-panel-loading' class to be removed.
	cy.wait(1000);

	// find the 'Details' tab and click it
	cy.get('.edac-tab').contains('Details').scrollIntoView();
	cy.get('.edac-tab').contains('Details').click();
	cy.wait(100);
});

Cypress.Commands.add('checkIssues', (key) => {
	cy.loginAndActivate();

	cy.fixture('errors.json').then((data) => {
		const issueData = data[key];
		cy.recheckAndShowDetails(issueData.postId);
		cy.get('.edac-details .edac-details-rule-title h3').contains(key).find('.edac-details-rule-count').invoke('text').then((text) => {
			assert(text === issueData.count, key + ' should have ' + issueData.count + ' issues');
		});
		cy.get('.edac-details .edac-details-rule-title h3').contains(key).scrollIntoView();

		// check if there are otherIssues
		if (issueData.otherIssues !== 'undefined' && issueData.otherIssues) {
			Object.entries(issueData.otherIssues).forEach(([key, value]) => {
				cy.get('.edac-details .edac-details-rule-title h3').contains(key).find('.edac-details-rule-count').invoke('text').then((text) => {
					assert(text === value.count, key + ' should have ' + value.count + ' issues');
				});
			});
		}
	});
});
