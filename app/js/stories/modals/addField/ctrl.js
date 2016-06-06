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
	.controller('addFieldModalCtrl', ['$scope', '$rootScope', '$route', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, $route, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addFieldText = data[0].text.stories.modal.addField;
		});

		/*
			Make data available in scope and initialise the fieldset object for
			ng-model so the modal is pre-filled with data
		 */
		$scope.story = data.story;
		$scope.component = data.component;
		$scope.instance = data.instance;
		$scope.fieldset = data.fieldset;
		$scope.field = {
			componentIndex: data.component.componentIndex,
			story: data.story.name,
			component: data.component.name,
			instanceName: data.instance.name,
			fieldsetName: data.fieldset.title,
			fieldName: '',
			options: '',
			association: ''
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
		$scope.triggerAddField = function(formIsValid, field) {
			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};
			$scope.closeModal();
			$rootScope.$emit('addField', [$scope.field]);
		};

		// bind an event to add a field when event triggered by modal
		var addFieldEvt = $rootScope.$on('addField', function(event, data) {
			$scope.addField(data[0]);
		});

		// unbind the $on above, so we don't get repeated calls. (Manual for rootScope only)
		$scope.$on('$destroy', addFieldEvt);

		// TODO: Link up to add BE
		$scope.addField = function(data) {

			if (!data || !data instanceof Object) return false; // show error?

			var urlStoryName = $rootScope.prepareForUrl(data.story);
			var urlComponentName = $rootScope.prepareForUrl(data.component);
			var urlComponentInstanceName = $rootScope.prepareForUrl(data.instanceName);
			var urlFieldsetName = $rootScope.prepareForUrl(data.fieldsetName);
			var urlFieldName = $rootScope.prepareForUrl(data.fieldName);

			data.modifiedStoryName = urlStoryName;
			data.modifiedComponentName = urlComponentName;
			data.modifiedInstanceName = urlComponentInstanceName;
			data.modifiedFieldsetName = urlFieldsetName;
			data.modifiedFieldName = urlFieldName;

			$.ajax({
				url: '/addField',
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