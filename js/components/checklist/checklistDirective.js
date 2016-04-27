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
			templateUrl: 'templates/components/checklist.html',
			scope: {
				type: '@type'
			}
		};
	});

})();