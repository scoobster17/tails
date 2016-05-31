(function(){

	angular.module('tailsApp')

	/**
	 * Directive to display a checklist, with either single line or multi-line
	 * entries.
	 */
	.directive('checklist', function() {
		return {
			restrict: 'E',
			replace: true,
			controller: 'checklistCtrl',
			templateUrl: 'js/components/checklist/checklist.html',
			scope: {
				type: '@type'
			}
		};
	});

})();