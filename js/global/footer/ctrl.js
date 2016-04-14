(function(){

	angular.module('tailsApp')

	.controller('footerCtrl', function($scope, $rootScope, constants) {

		// data
		$scope.year = $rootScope.date.getFullYear();
		$scope.creator = constants.creator;

	});
})();