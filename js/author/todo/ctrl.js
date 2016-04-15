(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the Author's To-Do list page
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
	 */
	.controller('authorToDoCtrl', ['$scope', '$rootScope', 'TextFactory', function($scope, $rootScope, TextFactory) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['To-do list', 'Author']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.author.todo;
		});

	}]);

})();