(function(){

	angular.module('tailsApp')

	.config(function($routeProvider) {

		$routeProvider

			// home page
			.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'homeCtrl'
			})

			// home page
			.when('/author', {
				templateUrl: 'templates/author/author.html',
				controller: 'authorCtrl'
			})

			// otherwise re-direct to home
			.otherwise({
				redirectTo: '/'
			});

	});

})();