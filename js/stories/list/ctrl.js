(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the list of stories saved
	 * @param  {dependency} $scope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
	 */
	.controller('storiesListCtrl', ['$scope', '$rootScope', 'TextFactory', function($scope, $rootScope, TextFactory) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Stories']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.stories.list;
		});

		// temporary data until BE created
		$scope.stories = [
			{
                name: 'Story 1',
                shortDescription: 'Story 1 description'
            },
            {
                name: 'Story 2',
                shortDescription: 'Story 2 description'
            }
		];

	}]);

})();