describe('Home page tests', function() {

	// ensure on home page for each test
	beforeEach(function() {
		browser.get(browser.params.appUrl);
	});

	describe('Check page functionality', function() {

		describe('Check main navigation', function() {

			it('Check "Stories" link has correct URL', function() {
				expect(element(by.css('.globalHeader nav li:nth-child(2) a'))
					.getAttribute('href'))
					.toEqual(browser.params.appUrl + '#/stories');
			});

			it('Check "Stories" link properly shows Story List page', function() {
				element(by.css('.globalHeader nav li:nth-child(2) a'))
					.click();
				expect(browser.getCurrentUrl())
					.toEqual(browser.params.appUrl + '#/stories');
			});

		});

		describe('Check page navigation', function() {

			it('Check "Go to your tails" link has correct URL', function() {
				expect(element(by.css('main .btn-primary'))
					.getAttribute('href'))
					.toEqual(browser.params.appUrl + '#/stories');
			});

			it('Check "Go to your tails" link properly shows Story List page', function() {
				browser.sleep(browser.params['loading-screen-timeout']);
				element(by.css('main .btn-primary'))
					.click();
				expect(browser.getCurrentUrl())
					.toEqual(browser.params.appUrl + '#/stories');
			});

			it('Check "About the author" link has correct URL', function() {
				expect(element(by.css('.panel-default .btn-default'))
					.getAttribute('href'))
					.toEqual(browser.params.appUrl + '#/author');
			});

			it('Check "About the author" link properly shows Author Home page', function() {
				browser.sleep(browser.params['loading-screen-timeout']);
				element(by.css('.panel-default .btn-default'))
					.click();
				expect(browser.getCurrentUrl())
					.toEqual(browser.params.appUrl + '#/author');
			});

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

//browser.get('http://localhost:7411/#/stories');
//expect(browser.getTitle()).toEqual('Stories | Tails');
//browser.get('http://localhost:7411/#/author');
//expect(browser.getTitle()).toEqual('Author | Tails');