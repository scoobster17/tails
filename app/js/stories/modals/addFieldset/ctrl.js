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
	.controller('addFieldsetModalCtrl', ['$scope', '$rootScope', '$route', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, $route, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addFieldsetText = data[0].text.stories.modal.addFieldset;
		});

		/*
			Make data available in scope and initialise the fieldset object for
			ng-model so the modal is pre-filled with data
		 */
		$scope.story = data.story;
		$scope.component = data.component;
		$scope.instance = data.instance;
		$scope.fieldset = {
			componentIndex: data.component.componentIndex,
			story: data.story.name,
			component: data.component.name,
			instanceName: data.instance.name,
			fieldsetName: ''
		};

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		/**
		 * When the submit button is pressed, if the form is valid we emit an
		 * event whereby we acknowledge the fieldset is to be stored.
		 * @param  {boolean} formIsValid Check as to whether the form is valid
		 * @param  {Object} fieldset    The object of ng-model containing data
		 */
		$scope.triggerAddFieldset = function(formIsValid, fieldset) {
			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};
			$scope.closeModal();
			$rootScope.$emit('addFieldset', [$scope.fieldset]);
		};

		// bind an event to add a fieldset when event triggered by modal
		var addFieldsetEvt = $rootScope.$on('addFieldset', function(event, data) {
			$scope.addFieldset(data[0]);
		});

		// unbind the $on above, so we don't get repeated calls. (Manual for rootScope only)
		$scope.$on('$destroy', addFieldsetEvt);

		// TODO: Link up to add BE
		$scope.addFieldset = function(data) {

			if (!data || !data instanceof Object) return false; // show error?

			var urlStoryName = $rootScope.prepareForUrl(data.story);
			var urlComponentName = $rootScope.prepareForUrl(data.component);
			var urlComponentInstanceName = $rootScope.prepareForUrl(data.instanceName);
			var urlFieldsetName = $rootScope.prepareForUrl(data.fieldsetName);

			data.modifiedStoryName = urlStoryName;
			data.modifiedComponentName = urlComponentName;
			data.modifiedInstanceName = urlComponentInstanceName;
			data.modifiedFieldsetName = urlFieldsetName;

			$.ajax({
				url: '/addFieldset',
				data: data,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					// console.log(data, textStatus, jqXHR);

					// refresh page
					$route.reload();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR, textStatus, errorThrown); // show error?
				}
			});

		};

	}]);

})();