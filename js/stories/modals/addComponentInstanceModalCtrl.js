(function(){

	angular.module('tailsApp')

	.controller('addComponentInstanceModalCtrl', ['$scope', '$rootScope', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addComponentInstanceText = data[0].text.stories.modal.addComponentInstance;
		});

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