/**
 * Karma Testing config file
 */
module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		reporters: ['spec', 'html'],
		htmlReporter: {
			outputDir: 'testing/reports/unit/',
			namedFiles: true,
			focusOnFailures: false,
			reportName: 'unit-test-report',
			pageTitle: 'Story Planner App Automated Tests'
		},
		browsers: ['PhantomJS'],
		files: [
			'../../../bower_components/jquery/dist/jquery.min.js',
			'../../../bower_components/angular/angular.min.js',
			'../../../bower_components/angular-route/angular-route.min.js',
			'../../../bower_components/angular-resource/angular-resource.min.js',
			'../../../bower_components/angular-animate/angular-animate.min.js',
			'../../../bower_components/angular-bootstrap/ui-bootstrap.min.js',
			'../../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'../../../bower_components/angular-spinkit/build/angular-spinkit.min.js',

			'../../../app/js/app.js',
			'../../../app/js/config/route.js',
			'../../../app/js/config/filters.js',
			'../../../app/js/data/text/factory.js',
			'../../../app/js/data/stories/factory.js',
			'../../../app/js/components/global/header/ctrl.js',
			'../../../app/js/components/global/header/directive.js',
			'../../../app/js/components/global/footer/ctrl.js',
			'../../../app/js/components/global/footer/directive.js',
			'../../../app/js/components/routeLoadingIndicator/directive.js',
			'../../../app/js/components/detailsPicker/ctrl.js',
			'../../../app/js/components/detailsPicker/directive.js',
			'../../../app/js/components/checklist/checklistCtrl.js',
			'../../../app/js/components/checklist/checklistDirective.js',
			'../../../app/js/components/checklist/confirmRemovalCtrl.js',
			'../../../app/js/home/ctrl.js',
			'../../../app/js/stories/addStoryDirective.js',
			'../../../app/js/stories/modals/addStoryModalCtrl.js',
			'../../../app/js/stories/addComponentInstanceDirective.js',
			'../../../app/js/stories/modals/addComponentInstanceModalCtrl.js',
			'../../../app/js/stories/list/ctrl.js',
			'../../../app/js/stories/details/ctrl.js',
			'../../../app/js/stories/componentdetails/ctrl.js',
			'../../../app/js/stories/componentinstance/ctrl.js',
			'../../../app/js/author/home/ctrl.js',
			'../../../app/js/author/personalInfo/ctrl.js',
			'../../../app/js/author/todo/ctrl.js',
			'../../../app/js/author/notes/ctrl.js',

			'../../../bower_components/angular-mocks/angular-mocks.js',
			'**/*.js'
		]
	});
};