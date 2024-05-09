# Accessibility Checker Rules Validator

This is a set of test data and E2E tests that validate the rules in the Accessibility Checker plugin against a list of expected pass/fail rates when the posts are scanned.

## Usage

The tests are run using the `cypress` testing framework. Cypress needs to know the URL it is checking against and the username & password of the checking user. Pass them to cypress as environment variables:

```bash
# Run with the default configuration
npx cypress run # or just npm run cypress
# Run with any or all of these custom env var overrides
export CYPRESS_BASE_URL="http://rulecheck.local" && npx cypress run --env username=yourusername --env password=yourpassword
```
