(function(){

	angular.module('tailsApp')

	.directive('checklist', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: 'checklistCtrl',
			templateUrl: 'templates/components/checklist.html'
		};
	});

})();