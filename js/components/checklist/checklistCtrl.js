(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the checklist component
	 * @param  {[type]} $scope
	 * @param  {Object} $timeout
	 */
	.controller('checklistCtrl', ['$scope', '$rootScope', '$timeout', 'TextFactory', '$uibModal', function($scope, $rootScope, $timeout, TextFactory, $modal) {

		// checklist setup
		$scope.newItem = {};
		$scope.checklist = {
			heading: 'Checklist',
			description: '',
			items: []
		};

		// set to single line by default, override is multiline type supplied
		$scope.multiline = false;
		if (typeof $scope.type !== 'undefined' && $scope.type === 'multiline') {
			$scope.multiline = true;
		};

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.checkListText = data[0].text.author.todo;
		});

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
		 * reset the form after adding and init add item again so no need to
		 * manually click 'add' again if wanting to add another item (usability)
		 * @param {Object} item Built from ng-model
		 */
		$scope.addItem = function(item) {
			if (typeof item.description === 'undefined' || item.description === '') return false;
			item.id = $scope.idCounter++;
			item.description = item.description.replace(/\</g, '&lt;');
			item.description = item.description.replace(/\>/g, '&gt;');
			item.description = item.description.replace(/\n/g, '<br />');
			$scope.checklist.items.push(item);
			$scope.resetForm();
			$scope.initAddItem();
		};

		/**
		 * Clears the form and hides the add item form
		 * @return {[type]} [description]
		 */
		$scope.resetForm = function() {
			$scope.addingItem = false;
			$scope.newItem = {};
			$scope.addItemForm.$setPristine();
		};

		/**
		 * Function to call modal requesting user to confirm deletion of item
		 */
		$scope.requestConfirmRemoveItem = function(item) {
			$scope.modalInstance = $modal.open({
				templateUrl: 'templates/author/confirmToDoRemoval.html',
				controller: 'confirmRemovalCtrl',
				resolve: {
					item: function() {
						return item;
					},
					modalText: function() {
						return $scope.checkListText.confirmRemovalModal;
					}
				},
				windowClass: "modal fade in"
			});
		};

		/**
		 * Listener for confirmation of item removal which then removes item
		 * @param  {event} event Not used
		 * @param  {Object} data The data passed from the $emit; item object
		 */
		$rootScope.$on('confirmedRemoveItem', function(event, data) {
			$scope.removeItem(data[0]);
		});

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