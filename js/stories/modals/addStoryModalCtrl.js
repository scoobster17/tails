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
	.controller('addStoryModalCtrl', ['$scope', '$rootScope', 'TextFactory', '$uibModalInstance', 'data', function($scope, $rootScope, TextFactory, $uibModalInstance, data) {

		// get component text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.addStoryText = data[0].text.stories.modal.addStory;
		});

		/**
		 * Function to dismiss modal
		 */
		$scope.closeModal = function() {
			$uibModalInstance.dismiss();
		};

		/**
		 * On successful submission on form in modal we trigger an event to
		 * acknoweledge the story should be stored.
		 * @param  {boolean} formIsValid Whether or not the form is valid
		 * @param  {Object}  story       Object of ng-model to be stored
		 */
		$scope.triggerAddStory = function(formIsValid, story) {
			if (!formIsValid) {
				$scope.submitted = true;
				return false;
			};
			$rootScope.$emit('addStory', [$scope.story]);
		};

		// bind an event to add a component instance when event triggered by modal
		var addStoryEvt = $rootScope.$on('addStory', function(event, data) {
			$scope.addStory(data[0]);
		});

		// unbind the $on above, so we don't get repeated calls. (Manual for rootScope only)
		$scope.$on('$destroy', addStoryEvt);

		// TODO: Link up to add BE
		$scope.addStory = function(data) {

			if (!data || !data instanceof Object) return false; // show error?

			// set the modifiedName for Angular routing
			data.modifiedName = $rootScope.prepareForUrl(data.name);

			// add default components to the new story for details page
			data.components = [
				{
		            "name": "Scenes",
		            "singularName": "Scene",
		            "associateCharactersAndLocations": true,
		            "componentIndex": 0
		        },
		        {
		            "name": "Characters",
		            "singularName": "Character",
		            "associateCharactersAndLocations": false,
		            "componentIndex": 1
		        },
		        {
		            "name": "Locations",
		            "singularName": "Location",
		            "associateCharactersAndLocations": false,
		            "componentIndex": 2
		        }
			];

			// loop through components to generate modifiedComponentName for Angular routing
			var noOfComponents = data.components.length;
			for (var i=0; i<noOfComponents; i++) {
				data.components[i].modifiedComponentName = $rootScope.prepareForUrl(data.components[i].name);
			}

			// perform AJAX call to BE to store data
			$.ajax({
				url: '/addStory',
				data: data,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					// console.log(data, textStatus, jqXHR);
					$scope.closeModal();
					$rootScope.$emit('storyAdded');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					//console.log(jqXHR, textStatus, errorThrown);

					var errorHTML = [
						'<div class="alert alert-danger" role="alert">',
							'<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',
							'<span class="sr-only">Error:</span>There was a probelm trying to add your story.',
						'</div>'
					].join('');

					// show error
					$('.modal-body').prepend(errorHTML);
				}
			});

		};

	}]);

})();