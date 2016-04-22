(function(){

	angular.module('tailsApp')

	.directive('globalHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/global/header.html',
			replace: true,
			controller: 'headerCtrl'
		};
	});

})();