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
	.controller('deleteComponentModalCtrl', ['$scope', '$rootScope', '$route', '$location', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, $route, $location, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.deleteComponentText = data[0].text.stories.modal.confirmDeleteComponentModal;
		});

		// assign the story to be displayed in the modal
		$scope.story = data.story;
		$scope.component = data.component;

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		// TODO: Link up to add BE
		$scope.deleteComponent = function(componentIndex, storyModifiedName) {

			if (typeof componentIndex !== 'number' || typeof storyModifiedName !== 'string') return false; // show error?

			// perform AJAX call to BE to store data
			$.ajax({
				url: '/deleteComponent',
				data: {
					componentIndex: componentIndex,
					storyModifiedName: storyModifiedName
				},
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					// console.log(data, textStatus, jqXHR);
					$scope.closeModal();
					$route.reload();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR, textStatus, errorThrown);

					var errorHTML = [
						'<div class="alert alert-danger" role="alert">',
							'<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',
							'<span class="sr-only">Error:</span>There was a probelm trying to delete your component.',
						'</div>'
					].join('');

					// show error
					$('.modal-body').prepend(errorHTML);
				}
			});

		};

	}]);

})();