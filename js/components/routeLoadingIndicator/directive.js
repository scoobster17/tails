(function() {

	angular.module('tailsApp')

	.directive('routeLoadingIndicator', ['$rootScope', function($rootScope) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/routeLoadingIndicator.html',
			link: function(scope, elem, attrs) {
				//scope.isRouteLoading = false;

				$rootScope.$on('$routeChangeStart', function() {
					angular.element(elem).css({'opacity': '1', "zIndex": 1000}).addClass('shown');
				});

				$rootScope.$on('$routeChangeSuccess', function() {
					setTimeout(function() {
						angular.element(elem).animate({opacity: 0, "zIndex": -1}, 200).removeClass('shown');
					}, 200);
				});
			}
		};
	}]);

})();