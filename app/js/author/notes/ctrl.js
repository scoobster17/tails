(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the Author's Notes page
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
	 */
	.controller('authorNotesCtrl', ['$scope', '$rootScope', 'TextFactory', function($scope, $rootScope, TextFactory) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Notes', 'Author']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.author.notes;
		});

	}]);

})();