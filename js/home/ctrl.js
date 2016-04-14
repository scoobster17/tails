(function(){

	angular.module('tailsApp')

	/**
	 * Controller for Home page
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
	 */
	.controller('homeCtrl', ['$scope', '$rootScope', 'TextFactory', function($scope, $rootScope, TextFactory) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Home']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.home;
		});

	}]);

})();