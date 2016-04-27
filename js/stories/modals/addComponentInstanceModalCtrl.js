(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the Add Component Instance Modal
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory       	Factory supplying text to modal
	 * @param  {dependency} $uibModalInstance
	 * @param  {Object}		data				Data being passed to the modal
	 */
	.controller('addComponentInstanceModalCtrl', ['$scope', '$rootScope', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addComponentInstanceText = data[0].text.stories.modal.addComponentInstance;
		});

		/*
			Make data available in scope and initialise the instance object for
			ng-model so the modal is pre-filled with data
		 */
		$scope.story = data.story;
		$scope.component = data.component;
		$scope.instance = {
			name: "",
			story: data.story.name,
			component: data.component.name
		};

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		/**
		 * When the submit button is pressed, if the form is valid we emit an
		 * event whereby we acknowledge the instance is to be stored.
		 * @param  {boolean} formIsValid Check as to whether the form is valid
		 * @param  {Object} instance    The object of ng-model containing data
		 */
		$scope.triggerAddInstance = function(formIsValid, instance) {
			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};
			$scope.closeModal();
			$rootScope.$emit('addComponentInstance', [$scope.instance]);
		};

		// bind an event to add a component instance when event triggered by modal
		var addComponentInstanceEvt = $rootScope.$on('addComponentInstance', function(event, data) {
			$scope.addComponentInstance(data[0]);
		});

		// unbind the $on above, so we don't get repeated calls. (Manual for rootScope only)
		$scope.$on('$destroy', addComponentInstanceEvt);

		// TODO: Link up to add BE
		$scope.addComponentInstance = function(data) {

			console.log('addComponentInstance: ', data);

			// go to components list page #/stories/story-name/component-name

		};

	}]);

})();