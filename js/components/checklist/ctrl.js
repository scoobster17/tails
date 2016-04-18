(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the checklist component
	 * @param  {[type]} $scope
	 * @param  {Object} $timeout
	 */
	.controller('checklistCtrl', ['$scope', '$timeout', function($scope, $timeout) {

		// checklist setup
		$scope.newItem = {};
		$scope.checklist = {
			heading: 'Checklist',
			description: '',
			items: []
		};

		// init id counter to ensure id's not repeated e.g. if items are deleted
		$scope.idCounter = 1;

		/**
		 * Function to set state so relevant html shown to add checlist item
		 */
		$scope.initAddItem = function() {
			$scope.addingItem = true;
			$timeout(function() {
				$('#newItemDescription').focus();
			});
		};

		/**
		 * Resets the input form for adding a checklist item
		 * @return {[type]} [description]
		 */
		$scope.cancelAddItem = function() {
			$scope.resetForm();
		};

		/**
		 * Add an item to the checklist items array, increasing the id counter,
		 * reset the form after adding and focus the add item btn so no need to
		 * use mouse if wanting to add another item (usability)
		 * @param {Object} item Built from ng-model
		 */
		$scope.addItem = function(item) {
			item.id = $scope.idCounter++;
			$scope.checklist.items.push(item);
			$scope.resetForm();
			$timeout(function(){
				$('#addItemBtn').focus();
			});
		};

		/**
		 * Clears the form and hides the add item form
		 * @return {[type]} [description]
		 */
		$scope.resetForm = function() {
			$scope.addingItem = false;
			$scope.newItem = {};
		};

		/**
		 * Remove an item from the array of checklist items
		 * @param  {object} itemToRemove supplied by ng-repeat
		 */
		$scope.removeItem = function(itemToRemove) {
			var itemIndex = $scope.checklist.items.findIndex(function(item) {
				if (item.id == itemToRemove.id) {
					return item.id;
				}
			});
			$scope.checklist.items.splice(itemIndex, 1);
		};

	}]);

})();