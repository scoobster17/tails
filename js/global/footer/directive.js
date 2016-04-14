(function(){

	angular.module('tailsApp')

	/**
	 * Directive for site footer
	 */
	.directive('globalFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/global/footer.html',
			replace: true,
			controller: 'footerCtrl'
		};
	});

})();