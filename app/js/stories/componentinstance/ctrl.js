(function() {

	angular.module('tailsApp')

	/**
	 * Controller for Story Component Instance view. The term component is used
	 * to represent a component of a story, e.g. characters, scenes. An instance
	 * of such a component would be an individual character or scene, e.g. Fred.
	 * This view lists the details of an individual instance, such as Fred.
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} $routeParams
	 * @param  {dependency} TextFactory
	 * @param  {dependency} StoriesFactory
	 * @param  {dependency} $window
	 */
	.controller('storyComponentInstanceCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', '$window', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, $window) {

		// Set up the view
		$scope.editMode = false;
		$scope.pickerOptions = {};
		$scope.originalInstanceDetails = {};
		$scope.editedInstanceDetails = {};

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

			// set story data to a scope variable
			$scope.story = data[0];

			// set component data to a scope variable
			$scope.component = $scope.story.components.filter(function(component) {
				return component.modifiedComponentName === $routeParams.component;
			});
			$scope.component = $scope.component[0];

			// set instance data to a scope variable, or re-direct if none found
			$scope.instance = $scope.component.list.filter(function(instance) {
				return instance.modifiedName === $routeParams.modifiedInstanceName;
			});
			if ($scope.instance.length > 0) {
				$scope.instance = $scope.instance[0];
				$scope.originalInstanceDetails = $rootScope.copyObject($scope.instance.details);
				$scope.editedInstanceDetails = $rootScope.copyObject($scope.originalInstanceDetails);
			} else {
				$window.location.href = '#/stories/' + $scope.story.modifiedName + '/' + $scope.component.modifiedComponentName;
			}

			// set locations data to a scope variable
			$scope.pickerOptions.location = $scope.story.components.filter(function(instance) {
				return instance.modifiedComponentName === 'locations';
			});
			$scope.pickerOptions.location = $scope.pickerOptions.location[0].list;

			// set characters data to a scope variable
			$scope.pickerOptions.characters = $scope.story.components.filter(function(instance) {
				return instance.modifiedComponentName === 'characters';
			});
			$scope.pickerOptions.characters = $scope.pickerOptions.characters[0].list;
		});

		/**
		 * Function to make the instance details editable
		 */
		$scope.enterEditMode = function() {
			$scope.editMode = true;
		};

		/**
		 * Function to make the instance details uneditable
		 */
		$scope.exitEditMode = function() {
			$scope.editedInstanceDetails = $rootScope.copyObject($scope.originalInstanceDetails);
			$scope.editMode = false;
		};

		/**
		 * Function to save changes to the instance and exit edit mode
		 */
		$scope.saveChanges = function() {

			// update the edited details in the scope
			$scope.originalInstanceDetails = $rootScope.copyObject($scope.editedInstanceDetails);

			// update the details in the JSON
			$scope.instance.details = $rootScope.copyObject($scope.editedInstanceDetails);

			// TODO: link to BE
			console.log('save to BE', $scope.editedInstanceDetails);

			// exit editing mode
			$scope.exitEditMode();
		};

	}]);

})();