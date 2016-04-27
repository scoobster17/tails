(function() {

	angular.module('tailsApp')

	/**
	 * Directive for the spinner that shows when a route is loading
	 * @param  {dependency} $rootScope
	 */
	.directive('routeLoadingIndicator', ['$rootScope', function($rootScope) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/routeLoadingIndicator.html',
			link: function(scope, elem, attrs) {

				// When a route change is requested, show the loading 'screen'
				$rootScope.$on('$routeChangeStart', function() {
					angular.element(elem).css({'opacity': '1', "zIndex": 1000}).addClass('shown');
				});

				// When a route change has finished, fade out the loading 'screen'
				$rootScope.$on('$routeChangeSuccess', function() {
					setTimeout(function() {
						angular.element(elem).animate({opacity: 0, "zIndex": -1}, 100).removeClass('shown');
					}, 100);
				});
			}
		};
	}]);

})();