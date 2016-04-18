(function(){

	angular.module('tailsApp')

	.filter('trustHtml', ['$sce', function($sce) {
		return function(str) {
			return $sce.trustAsHtml(str);
		};
	}]);

})();