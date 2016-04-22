(function() {

	angular.module('tailsApp')

	.factory('StoriesFactory', ['$resource', function($resource) {
		return $resource('/storiesData/:modifiedName', {}, {
			get: {isArray: true}
		});
	}]);

})();