(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the list of stories saved
	 * @param  {dependency} $scope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
	 */
	.controller('storiesListCtrl', ['$scope', '$rootScope', 'TextFactory', 'StoriesFactory', 'constants', function($scope, $rootScope, TextFactory, StoriesFactory, constants) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Stories']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.stories.list;
		});

		// get stories data
		var storiesQuery = StoriesFactory.query();
		storiesQuery.$promise.then(function(data) {
			$scope.stories = data;
		});

		$scope.modalOptions = constants.modalOptions;

		// show overlay to ask for initial story details
		$scope.initAddStory = $rootScope.showModal;

	}]);

})();