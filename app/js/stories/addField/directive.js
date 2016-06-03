(function() {

	angular.module('tailsApp')

	/**
	 * Directive for the add story button, which triggers an overlay
	 */
	.directive('addField', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function() {},
			templateUrl: 'js/stories/addField/addField.html'
		}
	});

})();