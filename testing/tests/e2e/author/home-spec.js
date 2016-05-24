describe('Author home page tests', function() {

	// ensure on home page for each test
	beforeEach(function() {
		browser.get(browser.params.appUrl + '#/author');
	});

	it('Check page title', function() {
		expect(browser.getTitle()).toEqual('Author | Tails');
	});

});