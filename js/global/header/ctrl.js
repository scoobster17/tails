(function(){

	angular.module('tailsApp')

	.controller('headerCtrl', function($scope, constants) {

		// data
		$scope.appName = constants.appName;

	});

})();