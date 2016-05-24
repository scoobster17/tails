var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
	framework: 'jasmine',
	params: {
		appUrl: 'http://localhost:7411/',
		'loading-screen-timeout': 250
	},
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
		'**/*-spec.js'
	],
	onPrepare: function() {
		jasmine.getEnv().addReporter(
			new Jasmine2HtmlReporter({
				filePrefix: 'e2e-test-report',
				savePath: 'testing/reports/e2e/'
			})
		);
	}
}