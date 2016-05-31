(function() {

	angular.module('tailsApp')

	/**
	 * Controller for Story Component Details. The term component is used to
	 * represent a component of a story, e.g. characters, scenes. An instance
	 * of such a component would be an individual character or scene, e.g. Fred.
	 * This view lists all of the instances that belong to a story component.
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} $routeParams
	 * @param  {dependency} TextFactory
	 * @param  {dependency} StoriesFactory
	 * @param  {dependency} $window
	 * @param  {Object}     constants      App constants
	 */
	.controller('storyComponentDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'TextFactory', 'StoriesFactory', '$window', 'constants', function($scope, $rootScope, $routeParams, TextFactory, StoriesFactory, $window, constants) {

		// Make the stored modal options available to the scope
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

			// set the story to a scope variable
			$scope.story = data[0];

			// filter the story components to match the route params or re-direct if fails
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