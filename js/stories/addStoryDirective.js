(function() {

	angular.module('tailsApp')

	.directive('addStory', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function() {},
			templateUrl: 'templates/stories/addStory.html'
		}
	});

})();