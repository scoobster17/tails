(function() {

	angular.module('tailsApp')

	.directive('addComponentInstance', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function() {},
			templateUrl: 'templates/stories/addComponentInstance.html'
		}
	});

})();