(function() {

	angular.module('tailsApp')

	.controller('storyComponentInstanceCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', '$window', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, $window) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Component Instance', 'Stories']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.stories.componentinstance;
		});

		// get story data
		var storyQuery = StoriesFactory.get({modifiedName: $routeParams.modifiedName});
		storyQuery.$promise.then(function(data){
			$scope.story = data[0];
			$scope.component = $scope.story.components.filter(function(component) {
				return component.modifiedComponentName === $routeParams.component;
			});
			$scope.component = $scope.component[0];
			$scope.instance = $scope.component.list.filter(function(instance) {
				return instance.modifiedName === $routeParams.modifiedInstanceName;
			});
			if ($scope.instance.length > 0) {
				$scope.instance = $scope.instance[0];
			} else {
				console.log($scope.component.modifiedComponentName);
				$window.location.href = '#/stories/' + $scope.story.modifiedName + '/' + $scope.component.modifiedComponentName;
			}
		});

	}]);

})();