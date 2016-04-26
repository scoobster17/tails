(function() {

	angular.module('tailsApp')

	.controller('storyComponentDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', '$window', 'constants', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, $window, constants) {

		$scope.modalOptions = constants.modalOptions;

		// show overlay to ask for initial story details
		$scope.initAddComponentInstance = $rootScope.showModal;

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Component Details', 'Stories']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.stories.componentdetails;
		});

		// get story data
		var storyQuery = StoriesFactory.get({modifiedName: $routeParams.modifiedName});
		storyQuery.$promise.then(function(data){
			$scope.story = data[0];
			$scope.component = $scope.story.components.filter(function(component) {
				return component.modifiedComponentName === $routeParams.component;
			});
			if ($scope.component.length > 0) {
				$scope.component = $scope.component[0];
			} else {
				$window.location.href = '#/stories/' + $scope.story.modifiedName;
			}
		});

	}]);

})();