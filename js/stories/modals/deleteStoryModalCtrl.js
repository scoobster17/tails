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
	.controller('deleteStoryModalCtrl', ['$scope', '$rootScope', '$location', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, $location, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.deleteStoryText = data[0].text.stories.modal.confirmDeleteStoryModal;
		});

		// assign the story to be displayed in the modal
		$scope.story = data.story;

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		// TODO: Link up to add BE
		$scope.deleteStory = function(storyName) {

			if (!storyName || typeof storyName !== 'string') return false; // show error?

			// perform AJAX call to BE to store data
			$.ajax({
				url: '/deleteStory',
				data: {name: storyName},
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					// console.log(data, textStatus, jqXHR);
					$scope.closeModal();
					$location.path('/stories');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					//console.log(jqXHR, textStatus, errorThrown);

					var errorHTML = [
						'<div class="alert alert-danger" role="alert">',
							'<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',
							'<span class="sr-only">Error:</span>There was a probelm trying to delete your story.',
						'</div>'
					].join('');

					// show error
					$('.modal-body').prepend(errorHTML);
				}
			});

		};

	}]);

})();