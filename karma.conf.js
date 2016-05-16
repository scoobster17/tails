/**
 * Karma Testing config file
 */
module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		reporters: ['spec', 'html'],
		htmlReporter: {
			outputDir: 'testing/reports',
			namedFiles: true,
			focusOnFailures: false,
			reportName: 'report',
			pageTitle: 'Story Planner App Automated Tests'
		},
		browsers: ['PhantomJS'],
		files: [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-route/angular-route.min.js',
			'bower_components/angular-resource/angular-resource.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'bower_components/angular-spinkit/build/angular-spinkit.min.js',

			'js/app.js',
			'js/config/route.js',
			'js/config/filters.js',
			'js/data/text/factory.js',
			'js/data/stories/factory.js',
			'js/components/global/header/ctrl.js',
			'js/components/global/header/directive.js',
			'js/components/global/footer/ctrl.js',
			'js/components/global/footer/directive.js',
			'js/components/routeLoadingIndicator/directive.js',
			'js/components/detailsPicker/ctrl.js',
			'js/components/detailsPicker/directive.js',
			'js/components/checklist/checklistCtrl.js',
			'js/components/checklist/checklistDirective.js',
			'js/components/checklist/confirmRemovalCtrl.js',
			'js/home/ctrl.js',
			'js/stories/addStoryDirective.js',
			'js/stories/modals/addStoryModalCtrl.js',
			'js/stories/addComponentInstanceDirective.js',
			'js/stories/modals/addComponentInstanceModalCtrl.js',
			'js/stories/list/ctrl.js',
			'js/stories/details/ctrl.js',
			'js/stories/componentdetails/ctrl.js',
			'js/stories/componentinstance/ctrl.js',
			'js/author/home/ctrl.js',
			'js/author/personalInfo/ctrl.js',
			'js/author/todo/ctrl.js',
			'js/author/notes/ctrl.js',

			'bower_components/angular-mocks/angular-mocks.js',
			'testing/tests/**/*.js'
		]
	});
};