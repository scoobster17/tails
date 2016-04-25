(function() {

	angular.module('tailsApp')

	.controller('storyComponentInstanceCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', '$window', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, $window) {

		// $scope.editMode = false;
		$scope.editMode = true;
		$scope.pickerOptions = {};

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

			// set story data
			$scope.story = data[0];

			// set component data
			$scope.component = $scope.story.components.filter(function(component) {
				return component.modifiedComponentName === $routeParams.component;
			});
			$scope.component = $scope.component[0];

			// set instance data
			$scope.instance = $scope.component.list.filter(function(instance) {
				return instance.modifiedName === $routeParams.modifiedInstanceName;
			});
			if ($scope.instance.length > 0) {
				$scope.instance = $scope.instance[0];
			} else {
				$window.location.href = '#/stories/' + $scope.story.modifiedName + '/' + $scope.component.modifiedComponentName;
			}

			// set locations data
			$scope.pickerOptions.location = $scope.story.components.filter(function(instance) {
				return instance.modifiedComponentName === 'locations';
			});
			$scope.pickerOptions.location = $scope.pickerOptions.location[0].list;

			// set characters data
			$scope.pickerOptions.characters = $scope.story.components.filter(function(instance) {
				return instance.modifiedComponentName === 'characters';
			});
			$scope.pickerOptions.characters = $scope.pickerOptions.characters[0].list;
		});

	}]);

})();