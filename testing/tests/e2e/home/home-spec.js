describe('Home page tests', function() {

	// ensure on home page for each test
	beforeEach(function() {
		browser.get(browser.params.appUrl);
	});

	describe('Check page navigation', function() {

		it('Check "Go to your tails" link properly shows Story List page', function() {

			var link = element(by.css('main .btn-primary'));

			// wait for spinner to close
			browser.sleep(browser.params['loading-screen-timeout']);

			// check href
			expect(link.getAttribute('href'))
				.toEqual(browser.params.appUrl + '#/stories');

			// check when clicked correct page is shown
			link.click();
			expect(browser.getCurrentUrl())
				.toEqual(browser.params.appUrl + '#/stories');

		});

		it('Check "About the author" link properly shows Author Home page', function() {

			var link = element(by.css('.panel-default .btn-default'));

			// wait for spinner to close
			browser.sleep(browser.params['loading-screen-timeout']);

			// check href
			expect(link.getAttribute('href'))
				.toEqual(browser.params.appUrl + '#/author');

			// check when clicked correct page is shown
			link.click();
			expect(browser.getCurrentUrl())
				.toEqual(browser.params.appUrl + '#/author');
		});

	});

	describe('Check page text', function() {

		it('Check home page title value', function() {
			expect(browser.getTitle()).toEqual('Home | Tails');
		});

		it('Check H1', function() {
			h1 = browser.findElement(protractor.By.tagName('h1'));
			expect(h1.getText()).toEqual('Tell your Tails');
		});

	});

});