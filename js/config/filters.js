(function(){

	angular.module('tailsApp')

	.filter('trustHtml', ['$sce', function($sce) {
		return function(str) {
			return $sce.trustAsHtml(str);
		};
	}])

	.filter('absoluteUrl', ['$location', function($location) {
		return function(str) {
			var absUrlWithoutStory = $location.absUrl().replace(/\/[^\/]+$/i,'');
			return absUrlWithoutStory + '/' + str;
		};
	}]);

})();