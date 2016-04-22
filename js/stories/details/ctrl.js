(function() {

	angular.module('tailsApp')

	.controller('storyDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory) {

		$scope.activeStoryDetailsTab = 0;

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
		});

		$scope.setActiveStoryDetailsTab = function(tabIndex) {
			$scope.activeStoryDetailsTab = tabIndex;
		};

		$scope.isActiveStoryDetailsTab = function(tabIndex) {
			return tabIndex === $scope.activeStoryDetailsTab;
		}

	}]);

})();