(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the site header
	 * @param  {dependency} $scope
	 * @param  {Object} constants  App constants
	 */
	.controller('headerCtrl', function($scope, constants) {

		// data
		$scope.appName = constants.appName;

	});

})();