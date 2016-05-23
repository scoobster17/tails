describe('Home page tests', function() {

	var appUrl = 'http://localhost:7411/';

	it('Check home page title value', function() {
		browser.get(appUrl);
		expect(browser.getTitle()).toEqual('Home | Tails');
	});

	/*describe('test 2 block', function() {

		it('test 2', function() {
			browser.get('http://localhost:7411/#/stories');
			expect(browser.getTitle()).toEqual('Stories | Tails');
		});

		it('test 3', function() {
			browser.get('http://localhost:7411/#/author');
			expect(browser.getTitle()).toEqual('Author | Tails');
		});

	});*/
});