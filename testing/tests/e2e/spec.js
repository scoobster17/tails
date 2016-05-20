describe('Protractor Demo App', function() {

	it('test 1', function() {
		browser.get('http://localhost:7411/');
		expect(browser.getTitle()).toEqual('Home | Tails');
	});

	describe('test 2 block', function() {

		it('test 2', function() {
			browser.get('http://localhost:7411/#/stories');
			expect(browser.getTitle()).toEqual('Stories | Tails');
		});

		it('test 3', function() {
			browser.get('http://localhost:7411/#/author');
			expect(browser.getTitle()).toEqual('Author | Tails');
		});

	});
});