(function() {

	angular.module('tailsApp')

	/**
	 * Controller for the story details view
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} $routeParams
	 * @param  {dependency} TextFactory
	 * @param  {dependency} StoriesFactory
	 * @param  {Object} 	constants		App constants
	 */
	.controller('storyDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', 'constants', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, constants) {

		// initial view config, making modal options available to scope
		$scope.activeStoryDetailsTab = 0;
		$scope.hideAddCustomComponent = true;
		$scope.modalOptions = constants.modalOptions;

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Story Details', 'Stories']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.stories.details;
		});

		// get story data
		var storyQuery = StoriesFactory.get({modifiedName: $routeParams.modifiedName});
		storyQuery.$promise.then(function(data){
			$scope.story = data[0];
			$scope.customComponentIndex = $scope.story.components.length + 1;
		});

		// set the active story details tab to show that tab
		$scope.setActiveStoryDetailsTab = function(tabIndex) {
			$scope.activeStoryDetailsTab = tabIndex;
		};

		// check if the current story details tab is active
		$scope.isActiveStoryDetailsTab = function(tabIndex) {
			return tabIndex === $scope.activeStoryDetailsTab;
		}

		// show overlay to ask for initial story details
		$scope.initAddComponentInstance = $rootScope.showModal;

		// show overlay to ask for confirmation to delete a story
		$scope.initDeleteStory = $rootScope.showModal;

	}]);

})();