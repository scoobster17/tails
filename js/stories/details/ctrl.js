(function() {

	angular.module('tailsApp')

	.controller('storyDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', 'constants', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, constants) {

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

		$scope.setActiveStoryDetailsTab = function(tabIndex) {
			$scope.activeStoryDetailsTab = tabIndex;
		};

		$scope.isActiveStoryDetailsTab = function(tabIndex) {
			return tabIndex === $scope.activeStoryDetailsTab;
		}

		// show overlay to ask for initial story details
		$scope.initAddComponentInstance = $rootScope.showModal;

	}]);

})();