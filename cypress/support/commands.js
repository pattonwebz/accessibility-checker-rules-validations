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
			cy.get('#user_login').should('be.visible').should('be.enabled').type(username);
			cy.get('#user_pass').should('be.visible').should('be.enabled').type(password);
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
	// find button that says 'Update' and click it
	cy.get('.editor-post-publish-button').click();
	// wait till a success message is displayed
	// allow this to take up to 10 seconds
	cy.get('.components-snackbar__content', { timeout: 10000 }).should('contain', 'Post updated');

	cy.intercept('GET', Cypress.config('baseUrl') + '/wp-admin/admin-ajax.php?action=edac_readability_ajax*').as('readabilityScanResults');
	cy.wait('@readabilityScanResults', { timeout: 10000 });
	cy.wait(1000);

	// find the 'Details' tab and click it
	cy.get('.edac-tab').contains('Details').scrollIntoView();
	cy.wait(100);
	cy.get('.edac-tab').contains('Details').click();
});
