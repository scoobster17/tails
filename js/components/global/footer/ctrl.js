(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the site header
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {Object} constants) 	App constants
	 */
	.controller('footerCtrl', function($scope, $rootScope, constants) {

		// data
		$scope.year = $rootScope.date.getFullYear();
		$scope.creator = constants.creator;

	});

})();