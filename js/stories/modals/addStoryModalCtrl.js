(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the Add Story Modal
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory			Supplied text to modal
	 * @param  {dependency} $uibModalInstance
	 * @param  {Object} 	data				Data to be used by modal
	 */
	.controller('addStoryModalCtrl', ['$scope', '$rootScope', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addStoryText = data[0].text.stories.modal.addStory;
		});

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		/**
		 * On successful submission on form in modal we trigger an event to
		 * acknoweledge the story should be stored.
		 * @param  {boolean} formIsValid Whether or not the form is valid
		 * @param  {Object}  story       Object of ng-model to be stored
		 */
		$scope.triggerAddStory = function(formIsValid, story) {
			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};
			$scope.closeModal();
			$rootScope.$emit('addStory', [$scope.story]);
		};

		// bind an event to add a component instance when event triggered by modal
		var addStoryEvt = $rootScope.$on('addStory', function(event, data) {
			$scope.addStory(data[0]);
		});

		// unbind the $on above, so we don't get repeated calls. (Manual for rootScope only)
		$scope.$on('$destroy', addStoryEvt);

		// TODO: Link up to add BE
		$scope.addStory = function(data) {

			console.log('addStory: ', data);

			// go to stories list page #/stories

		};

	}]);

})();