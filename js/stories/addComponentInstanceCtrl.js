(function(){

	angular.module('tailsApp')

	.controller('addComponentInstanceCtrl', ['$scope', '$rootScope', 'TextFactory', '$uibModalInstance', 'story', 'component', function($scope, $rootScope, TextFactory, $uibModalInstance, story, component) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addComponentInstanceText = data[0].text.stories.modal.addComponentInstance;
		});

		$scope.story = story;
		$scope.component = component;
		$scope.instance = {
			name: "",
			story: story.name,
			component: component.name
		};

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		$scope.triggerAddInstance = function(formIsValid, instance) {
			$scope.closeModal();
			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};
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
		};

	}]);

})();