(function(){

	angular.module('tailsApp')

	/**
	 * Controller for To-Do list removal confirmation overlay
	 * @param  {scope} $scope
	 * @param  {scope} $rootScope
	 * @param  {service} $uibModalInstance Bootstrap Modal service
	 * @param  {Object} item The item to be removed
	 * @param  {Object} modalText Text to be displayed in the modal
	 */
	.controller('confirmRemovalCtrl', function($scope, $rootScope, $uibModalInstance, item, modalText) {

		// assign item to scope for template
		$scope.item = item;

		// get modal text
		$scope.text = modalText;

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		/**
		 * Confirm the item removal by emitting an event to be picked up by the
		 * checklist controller to remove the item from the checklist, and close
		 * the modal
		 * @return {[type]} [description]
		 */
		$scope.confirmRemoveItem = function() {
			$scope.closeModal();
			$rootScope.$emit('confirmedRemoveItem', [$scope.item]);
		};

	});

})();