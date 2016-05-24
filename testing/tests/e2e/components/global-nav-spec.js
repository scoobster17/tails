describe('Main navigation tests', function() {

	// ensure on home page for each test
	beforeEach(function() {
		browser.get(browser.params.appUrl);
	});

	it('Check "Stories" link properly shows Story List page', function() {

		// get the stories link
		var storiesLink = element(by.css('.globalHeader nav li:nth-child(2) a'));

		// check the href
		expect(storiesLink.getAttribute('href'))
			.toEqual(browser.params.appUrl + '#/stories');

		// check that when clicked the stories list page is shown
		storiesLink.click();
		expect(browser.getCurrentUrl())
			.toEqual(browser.params.appUrl + '#/stories');
	});

});