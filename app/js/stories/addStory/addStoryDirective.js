(function() {

	angular.module('tailsApp')

	/**
	 * Directive for the add story button, which triggers an overlay
	 */
	.directive('addStory', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function() {},
			templateUrl: 'js/stories/addStory/addStory.html'
		}
	});

})();