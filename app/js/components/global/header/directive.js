(function(){

	angular.module('tailsApp')

	/**
	 * Directive for the site header
	 */
	.directive('globalHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/components/global/header/header.html',
			replace: true,
			controller: 'headerCtrl'
		};
	});

})();