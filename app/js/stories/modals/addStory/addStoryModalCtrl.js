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
			data.components = defaultComponents;

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

		// JSON with default component settings
		var defaultComponents = [
			{
	            "name": "Scenes",
	            "singularName": "Scene",
	            "associateCharactersAndLocations": true,
                "modifiedComponentName": "scenes",
	            "componentIndex": 0,
	            "fieldsets" : {
                    "general-information" : {
                        "order" : 1,
                        "name" : "general-information",
                        "title" : "General Information"
                    },
                    "time-and-place" : {
                        "order" : 2,
                        "name" : "time-and-place",
                        "title" : "Time and Place"
                    },
                    "scene-importance-and-atmosphere" : {
                        "order" : 3,
                        "name" : "scene-importance-and-atmosphere",
                        "title" : "Scene Importance and Atmosphere"
                    },
                    "characters" : {
                        "order" : 4,
                        "name" : "characters",
                        "title" : "Characters"
                    }
                },
                "fields" : {
                    "name" : {
                        "options" : "",
                        "association" : "",
                        "order" : "1",
                        "inputName" : "name",
                        "label" : "Name",
                        "fieldset" : "general-information",
                        "type" : "text"
                    },
                    "short-description" : {
                        "options" : "",
                        "association" : "",
                        "order" : "2",
                        "inputName" : "short-description",
                        "label" : "Short Description",
                        "fieldset" : "general-information",
                        "type" : "textarea"
                    },
                    "long-description" : {
                        "options" : "",
                        "association" : "",
                        "order" : "3",
                        "inputName" : "long-description",
                        "label" : "Long Description",
                        "fieldset" : "general-information",
                        "type" : "textarea"
                    },
                    "act" : {
                        "options" : [
                            "Prologue",
                            "Act1",
                            "Act2",
                            "Act3",
                            "Epilogue"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "4",
                        "inputName" : "act",
                        "label" : "Act",
                        "fieldset" : "general-information",
                        "type" : "select"
                    },
                    "position-in-sequence" : {
                        "options" : "",
                        "association" : "",
                        "order" : "5",
                        "inputName" : "position-in-sequence",
                        "label" : "Position in Sequence",
                        "fieldset" : "general-information",
                        "type" : "text"
                    },
                    "time" : {
                        "options" : "",
                        "association" : "",
                        "order" : "6",
                        "inputName" : "time",
                        "label" : "Time",
                        "fieldset" : "time-and-place",
                        "type" : "text"
                    },
                    "place" : {
                        "options" : "",
                        "association" : "locations",
                        "optionType" : "associated",
                        "order" : "7",
                        "inputName" : "place",
                        "label" : "Place",
                        "fieldset" : "time-and-place",
                        "type" : "radio"
                    },
                    "importance" : {
                        "options" : [
                            "5",
                            "4",
                            "3",
                            "2",
                            "1"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "8",
                        "inputName" : "importance",
                        "label" : "Importance",
                        "fieldset" : "scene-importance-and-atmosphere",
                        "type" : "select"
                    },
                    "tension" : {
                        "options" : [
                            "10",
                            "9",
                            "8",
                            "7",
                            "6",
                            "5",
                            "4",
                            "3",
                            "2",
                            "1"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "9",
                        "inputName" : "tension",
                        "label" : "Tension",
                        "fieldset" : "scene-importance-and-atmosphere",
                        "type" : "select"
                    },
                    "characters-featured" : {
                        "options" : "",
                        "association" : "characters",
                        "optionType" : "associated",
                        "order" : "10",
                        "inputName" : "characters-featured",
                        "label" : "Characters featured",
                        "fieldset" : "characters",
                        "type" : "checkbox"
                    }
                }
	        },
	        {
	            "name": "Characters",
	            "singularName": "Character",
                "modifiedComponentName": "characters",
	            "associateCharactersAndLocations": false,
	            "componentIndex": 1,
	            "fieldsets" : {
                    "personal-information" : {
                        "order" : 1,
                        "name" : "personal-information",
                        "title" : "Personal Information"
                    },
                    "relevance" : {
                        "order" : 2,
                        "name" : "relevance",
                        "title" : "Relevance"
                    },
                    "about" : {
                        "order" : 3,
                        "name" : "about",
                        "title" : "About"
                    },
                    "associates" : {
                        "order" : 4,
                        "name" : "associates",
                        "title" : "Associates"
                    },
                    "education" : {
                        "order" : 5,
                        "name" : "education",
                        "title" : "Education"
                    }
                },
                "fields" : {
                    "name" : {
                        "options" : "",
                        "association" : "",
                        "order" : "1",
                        "inputName" : "name",
                        "label" : "Name",
                        "fieldset" : "personal-information",
                        "type" : "text"
                    },
                    "age" : {
                        "options" : "",
                        "association" : "",
                        "order" : "2",
                        "inputName" : "age",
                        "label" : "Age",
                        "fieldset" : "personal-information",
                        "type" : "number"
                    },
                    "address" : {
                        "options" : "",
                        "association" : "",
                        "order" : "3",
                        "inputName" : "address",
                        "label" : "Address",
                        "fieldset" : "personal-information",
                        "type" : "textarea"
                    },
                    "occupation" : {
                        "options" : "",
                        "association" : "",
                        "order" : "4",
                        "inputName" : "occupation",
                        "label" : "Occupation",
                        "fieldset" : "personal-information",
                        "type" : "text"
                    },
                    "gender" : {
                        "options" : [
                            "Male",
                            "Female"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "5",
                        "inputName" : "gender",
                        "label" : "Gender",
                        "fieldset" : "personal-information",
                        "type" : "select"
                    },
                    "school" : {
                        "options" : "",
                        "association" : "",
                        "order" : "6",
                        "inputName" : "school",
                        "label" : "School",
                        "fieldset" : "education",
                        "type" : "textarea"
                    },
                    "college" : {
                        "options" : "",
                        "association" : "",
                        "order" : "7",
                        "inputName" : "college",
                        "label" : "College",
                        "fieldset" : "education",
                        "type" : "textarea"
                    },
                    "university" : {
                        "options" : "",
                        "association" : "",
                        "order" : "8",
                        "inputName" : "university",
                        "label" : "University",
                        "fieldset" : "education",
                        "type" : "textarea"
                    },
                    "achievements" : {
                        "options" : "",
                        "association" : "",
                        "order" : "9",
                        "inputName" : "achievements",
                        "label" : "Achievements",
                        "fieldset" : "about",
                        "type" : "textarea"
                    },
                    "skills" : {
                        "options" : "",
                        "association" : "",
                        "order" : "10",
                        "inputName" : "skills",
                        "label" : "Skills",
                        "fieldset" : "about",
                        "type" : "textarea"
                    },
                    "interests" : {
                        "options" : "",
                        "association" : "",
                        "order" : "11",
                        "inputName" : "interests",
                        "label" : "Interests",
                        "fieldset" : "about",
                        "type" : "textarea"
                    },
                    "family" : {
                        "options" : "",
                        "association" : "characters",
                        "optionType" : "associated",
                        "order" : "12",
                        "inputName" : "family",
                        "label" : "Family",
                        "fieldset" : "associates",
                        "type" : "checkbox"
                    },
                    "friends" : {
                        "options" : "",
                        "association" : "characters",
                        "optionType" : "associated",
                        "order" : "13",
                        "inputName" : "friends",
                        "label" : "Friends",
                        "fieldset" : "associates",
                        "type" : "checkbox"
                    },
                    "importance" : {
                        "options" : [
                            "Primary",
                            "Secondary",
                            "Tertiary"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "14",
                        "inputName" : "importance",
                        "label" : "Importance",
                        "fieldset" : "relevance",
                        "type" : "select"
                    }
                }
	        },
	        {
	            "name": "Locations",
	            "singularName": "Location",
	            "associateCharactersAndLocations": false,
                "modifiedComponentName": "locations",
	            "componentIndex": 2,
	            "fieldsets" : {
                    "location-details" : {
                        "order" : 1,
                        "name" : "location-details",
                        "title" : "Location Details"
                    },
                    "building-details" : {
                        "order" : 2,
                        "name" : "building-details",
                        "title" : "Building Details"
                    },
                    "notes" : {
                        "order" : 3,
                        "name" : "notes",
                        "title" : "Notes"
                    }
                },
                "fields" : {
                    "name" : {
                        "options" : "",
                        "association" : "",
                        "order" : "1",
                        "inputName" : "name",
                        "label" : "Name",
                        "fieldset" : "location-details",
                        "type" : "text"
                    },
                    "country" : {
                        "options" : "",
                        "association" : "",
                        "order" : "2",
                        "inputName" : "country",
                        "label" : "Country",
                        "fieldset" : "location-details",
                        "type" : "text"
                    },
                    "co-ordinates" : {
                        "options" : "",
                        "association" : "",
                        "order" : "3",
                        "inputName" : "co-ordinates",
                        "label" : "Co-ordinates",
                        "fieldset" : "location-details",
                        "type" : "text"
                    },
                    "building-name" : {
                        "options" : "",
                        "association" : "",
                        "order" : "4",
                        "inputName" : "building-name",
                        "label" : "Building Name",
                        "fieldset" : "building-details",
                        "type" : "text"
                    },
                    "address" : {
                        "options" : "",
                        "association" : "",
                        "order" : "5",
                        "inputName" : "address",
                        "label" : "Address",
                        "fieldset" : "building-details",
                        "type" : "textarea"
                    },
                    "purpose" : {
                        "options" : [
                            "Multi-purpose",
                            "Residential",
                            "Business",
                            "Social"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "6",
                        "inputName" : "purpose",
                        "label" : "Purpose",
                        "fieldset" : "building-details",
                        "type" : "select"
                    },
                    "size" : {
                        "options" : "",
                        "association" : "",
                        "order" : "7",
                        "inputName" : "size",
                        "label" : "Size",
                        "fieldset" : "building-details",
                        "type" : "text"
                    },
                    "floors" : {
                        "options" : "",
                        "association" : "",
                        "order" : "8",
                        "inputName" : "floors",
                        "label" : "Floors",
                        "fieldset" : "building-details",
                        "type" : "number"
                    },
                    "occupants" : {
                        "options" : "",
                        "association" : "",
                        "order" : "9",
                        "inputName" : "occupants",
                        "label" : "Occupants",
                        "fieldset" : "building-details",
                        "type" : "number"
                    },
                    "utilities" : {
                        "options" : [
                            "Gas",
                            "Electricity",
                            "Water",
                            "Sewage"
                        ],
                        "association" : "",
                        "optionType" : "custom",
                        "order" : "10",
                        "inputName" : "utilities",
                        "label" : "Utilities",
                        "fieldset" : "building-details",
                        "type" : "checkbox"
                    },
                    "notes" : {
                        "options" : "",
                        "association" : "",
                        "order" : "11",
                        "inputName" : "notes",
                        "label" : "Notes",
                        "fieldset" : "notes",
                        "type" : "textarea"
                    }
                }
	        }
		];

	}]);

})();