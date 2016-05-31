(function() {

	angular.module('tailsApp')

	/**
	 * Directive for the add story button, which triggers an overlay
	 */
	.directive('deleteStory', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function() {},
			templateUrl: 'templates/stories/deleteStory.html'
		}
	});

})();