(function(){

	angular.module('tailsApp')

	/**
	 * Adding config including routing to supply templates to URL requests
	 * @param  {dependency} $routeProvider
	 */
	.config(function($routeProvider) {

		$routeProvider

			// home page
			.when('/', {
				templateUrl: 'js/home/home.html',
				controller: 'homeCtrl'
			})

			////////////////////////////////////////////////////////////////////
			// STORIES SECTION
			////////////////////////////////////////////////////////////////////

			// stories list page
			.when('/stories', {
				templateUrl: 'js/stories/list/list.html',
				controller: 'storiesListCtrl'
			})

				// story details page
				.when('/stories/:modifiedName', {
					templateUrl: 'js/stories/details/details.html',
					controller: 'storyDetailsCtrl'
				})

					// story sub-details page
					.when('/stories/:modifiedName/:component', {
						templateUrl: 'js/stories/componentdetails/componentdetails.html',
						controller: 'storyComponentDetailsCtrl'
					})

						// story single sub-detail page
						.when('/stories/:modifiedName/:component/:modifiedInstanceName', {
							templateUrl: 'js/stories/componentinstance/componentinstance.html',
							controller: 'storyComponentInstanceCtrl'
						})

			////////////////////////////////////////////////////////////////////
			// AUTHOR SECTION
			////////////////////////////////////////////////////////////////////

			// author home page
			.when('/author', {
				templateUrl: 'js/author/home/home.html',
				controller: 'authorCtrl'
			})

				// author personal info page
				.when('/author/personalInfo', {
					templateUrl: 'js/author/personalInfo/personalInfo.html',
					controller: 'authorPersonalInfoCtrl'
				})

				// author to-do list page
				.when('/author/todo', {
					templateUrl: 'js/author/todo/todo.html',
					controller: 'authorToDoCtrl'
				})

				// author notes page
				.when('/author/notes', {
					templateUrl: 'js/author/notes/notes.html',
					controller: 'authorNotesCtrl'
				})

			// otherwise re-direct to home
			.otherwise({
				redirectTo: '/'
			});

	});

})();