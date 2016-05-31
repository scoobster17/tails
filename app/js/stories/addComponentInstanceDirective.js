(function() {

	angular.module('tailsApp')

	/**
	 * Directive for the Add Component Instance button that triggers an overlay
	 */
	.directive('addComponentInstance', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function() {},
			templateUrl: 'templates/stories/addComponentInstance.html'
		}
	});

})();