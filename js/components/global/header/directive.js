(function(){

	angular.module('tailsApp')

	/**
	 * Directive for the site header
	 */
	.directive('globalHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/global/header.html',
			replace: true,
			controller: 'headerCtrl'
		};
	});

})();