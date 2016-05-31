(function(){

	angular.module('tailsApp')

	/**
	 * Directive for site footer
	 */
	.directive('globalFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/components/global/footer/footer.html',
			replace: true,
			controller: 'footerCtrl'
		};
	});

})();