(function(){

	/**
	 * Defining config in terms of custom filters to be used across the app
	 */
	angular.module('tailsApp')

	/**
	 * Use the $sce service to tell Angular to trust the passed HTML and render
	 * @param  {dependency} $sce
	 */
	.filter('trustHtml', ['$sce', function($sce) {
		return function(str) {
			return $sce.trustAsHtml(str);
		};
	}])

	/**
	 * Use the $location service to construct an absolute URL appending the
	 * string supplied. This is used to form demonstratory URLs.
	 * @param  {dependency} $location
	 */
	.filter('absoluteUrl', ['$location', function($location) {
		return function(str) {
			var absUrlWithoutStory = $location.absUrl().replace(/\/[^\/]+$/i,'');
			return absUrlWithoutStory + '/' + str;
		};
	}]);

})();