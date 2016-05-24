describe('Stories list page tests', function() {

	// ensure on home page for each test
	beforeEach(function() {
		browser.get(browser.params.appUrl + '#/stories');
	});

	it('Check page title', function() {
		expect(browser.getTitle()).toEqual('Stories | Tails');
	});

});