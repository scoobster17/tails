(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the checklist component
	 * @param  {[type]} $scope
	 * @param  {Object} $timeout
	 */
	.controller('checklistCtrl', ['$scope', '$rootScope', '$timeout', 'TextFactory', '$uibModal', function($scope, $rootScope, $timeout, TextFactory, $modal) {

		// checklist setup
		$scope.addingItem = false;
		$scope.editingItem = false;
		$scope.newItem = {};
		$scope.originalItem = {};
		$scope.editedItem = {};
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
			$scope.resetAddForm();
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
			item.description = $rootScope.escapeHtml(item.description);
			$scope.checklist.items.push(item);
			$scope.resetAddForm();
			$scope.initAddItem();
		};

		/**
		 * Function to allow the user to edit the item
		 * @param  {Object} item The item to be edited
		 */
		$scope.initEditItem = function(item) {
			$scope.addingItem = false;
			for (var prop in item) {
				$scope.originalItem[prop] = item[prop];
				if (prop === 'description') {
					$scope.editedItem[prop] = item.description.replace(/\<br \/\>/g, '\n');
				} else {
					$scope.editedItem[prop] = item[prop];
				}
			}
			$scope.editingItem = $scope.editedItem.id;
			$timeout(function() {
				$('.editingItem #editingItemDescription').focus();
			});
		};

		$scope.updateItem = function(item) {
			var itemToEditIndex = $scope.getItemIndex(item);
			$scope.editedItem.description = $rootScope.escapeHtml($scope.editedItem.description);
			$scope.checklist.items[itemToEditIndex] = $scope.editedItem;
			$scope.resetEditForm();
		};

		$scope.revertItem = function() {
			$scope.resetEditForm();
		}

		/**
		 * Clears the form and hides the add item form
		 * @return {[type]} [description]
		 */
		$scope.resetAddForm = function() {
			$scope.addingItem = false;
			$scope.newItem = {};
			$scope.addItemForm.$setPristine();
		};

		$scope.resetEditForm = function() {
			$scope.editingItem = false;
			$scope.originalItem = {};
			$scope.editedItem = {};
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

		$scope.getItemIndex = function(itemToFind) {
			return $scope.checklist.items.findIndex(function(item) {
				if (item.id == itemToFind.id) {
					return item.id;
				}
			});
		};

		/**
		 * Remove an item from the array of checklist items
		 * @param  {object} itemToRemove supplied by ng-repeat
		 */
		$scope.removeItem = function(itemToRemove) {
			var itemToRemoveIndex = $scope.getItemIndex(itemToRemove);
			$scope.checklist.items.splice(itemToRemoveIndex, 1);
		};

	}]);

})();