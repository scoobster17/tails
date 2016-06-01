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
	.controller('storyDetailsCtrl', ['$scope', '$rootScope', '$routeParams', '$route', 'TextFactory', 'StoriesFactory', 'constants', function($scope, $rootScope, $routeParams, $route, TextFactory, StoriesFactory, constants) {

		// initial view config, making modal options available to scope
		$scope.activeStoryDetailsTab = 0;
		$scope.hideAddCustomComponent = true;
		$scope.modalOptions = constants.modalOptions;
		var resetNewComponent = function() {
			$scope.component = {
				associateCharactersAndLocations: false
			};
			if ($scope.addComponentForm) $scope.addComponentForm.$setPristine();
		};
		$scope.submitted = false;

		// reset new component form on load
		resetNewComponent();

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
		var getStoriesData = function(now) {
			var storyQuery = StoriesFactory.get({modifiedName: $routeParams.modifiedName});
			storyQuery.$promise.then(function(data){
				$scope.story = data[0];
				$scope.customComponentIndex = $scope.story.components.length + 1;
				$scope.component.story = $scope.story.name;
			});
		};
		getStoriesData();

		// set the active story details tab to show that tab
		var setActiveStoryDetailsTab = function(tabIndex) {
			$scope.activeStoryDetailsTab = tabIndex;
		};
		$scope.setActiveStoryDetailsTab = setActiveStoryDetailsTab;

		// check if the current story details tab is active
		$scope.isActiveStoryDetailsTab = function(tabIndex) {
			return tabIndex === $scope.activeStoryDetailsTab;
		}

		// show overlay to ask for initial story details
		$scope.initAddComponentInstance = $rootScope.showModal;

		// show overlay to ask for confirmation to delete a story and component
		$scope.initDeleteComponent = $rootScope.showModal;
		$scope.initDeleteStory = $rootScope.showModal;

		/**
		 * Function to set possibly untouched field input as touched for validation
		 */
		$scope.triggerPluralDirty = function() {
			$scope.addComponentForm.componentNamePlural.$setDirty();
			$scope.addComponentForm.componentNamePlural.$setTouched();
		};

		/**
		 * Function to reload the route after adding a component
		 */
		var reloadRoute = function() {
			$route.reload();
		};

		/**
		 * When the submit button is pressed, if the form is valid we handle
		 * adding a component to the story
		 * @param  {boolean} formIsValid Check as to whether the form is valid
		 * @param  {Object} component    The object of ng-model containing data
		 */
		$scope.triggerAddComponent = function(formIsValid, component) {

			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};

			component.modifiedStoryName = $rootScope.prepareForUrl(component.story);
			component.modifiedComponentName = $rootScope.prepareForUrl(component.name);

			$.ajax({
				url: '/addComponent',
				data: component,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					// console.log(data, textStatus, jqXHR);

					// get the updated story data including the new component
					// getStoriesData();

					// clear and hide the add component form
					// resetNewComponent();
					// $('#customComponentFormTrigger').click();

					// set the active tab
					// setActiveStoryDetailsTab(1);

					// refresh the route as updating page doesn't seem to be working
					reloadRoute();

				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR, textStatus, errorThrown); // show error
				}
			});
		};

		/**
		 * Function to update the plural field if untouched to pre-fill with
		 * same value as singular value being entered plus an 's' for usability.
		 * Still editable so if an 's' isn't correct it can be changed manually
		 */
		$scope.updatePlural = function(event) {
			var singularValue = $(event.target).val();
			var $pluralInput = $('#componentNamePlural');

			if ($pluralInput.hasClass('ng-pristine')) {
				$scope.component.name = singularValue + 's';
			}
		};

	}]);

})();