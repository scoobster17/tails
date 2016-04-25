(function(){

	angular.module('tailsApp')

	.config(function($routeProvider) {

		$routeProvider

			// home page
			.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'homeCtrl'
			})

			////////////////////////////////////////////////////////////////////
			// STORIES SECTION
			////////////////////////////////////////////////////////////////////

			// stories list page
			.when('/stories', {
				templateUrl: 'templates/stories/list.html',
				controller: 'storiesListCtrl'
			})

				// story details page
				.when('/stories/:modifiedName', {
					templateUrl: 'templates/stories/details.html',
					controller: 'storyDetailsCtrl'
				})

					// story sub-details page
					.when('/stories/:modifiedName/:component', {
						templateUrl: 'templates/stories/componentdetails.html',
						controller: 'storyComponentDetailsCtrl'
					})

						// story single sub-detail page
						.when('/stories/:modifiedName/:component/:modifiedInstanceName', {
							templateUrl: 'templates/stories/componentinstance.html',
							controller: 'storyComponentInstanceCtrl'
						})

			////////////////////////////////////////////////////////////////////
			// AUTHOR SECTION
			////////////////////////////////////////////////////////////////////

			// author home page
			.when('/author', {
				templateUrl: 'templates/author/home.html',
				controller: 'authorCtrl'
			})

				// author personal info page
				.when('/author/personalInfo', {
					templateUrl: 'templates/author/personalInfo.html',
					controller: 'authorPersonalInfoCtrl'
				})

				// author to-do list page
				.when('/author/todo', {
					templateUrl: 'templates/author/todo.html',
					controller: 'authorToDoCtrl'
				})

				// author notes page
				.when('/author/notes', {
					templateUrl: 'templates/author/notes.html',
					controller: 'authorNotesCtrl'
				})

			// otherwise re-direct to home
			.otherwise({
				redirectTo: '/'
			});

	});

})();