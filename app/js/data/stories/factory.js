(function() {

	angular.module('tailsApp')

	/**
	 * Factory to retrieve stories data
	 * @param  {dependency} $resource
	 */
	.factory('StoriesFactory', ['$resource', function($resource) {
		return $resource('/storiesData/:modifiedName', {}, {
			get: {isArray: true}
		});
	}]);

})();