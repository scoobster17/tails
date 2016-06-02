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
	            "componentIndex": 0,
	            "fieldsets": {
	            	"general": {
	            		"name": "general",
	            		"title": "General Information",
	            		"order": 1
	            	},
	            	"time and place": {
	            		"name": "time and place",
	            		"title": "Timing & Geographical Details",
	            		"order": 2
	            	},
	            	"importance": {
	            		"name": "importance",
	            		"title": "Scene Importance and Atmosphere",
	            		"order": 3
	            	},
	            	"characters": {
	            		"name": "characters",
	            		"title": "Characters",
	            		"order": 4
	            	}
	            },
	            "fields": {
	            	"name": {
	            		"label": "Name",
                        "order": 1,
                        "fieldset": "general",
                        "inputName": "name",
                        "type": "text"
                    },
                    "shortDesc": {
                    	"label": "Short Description",
                        "order": 2,
                        "fieldset": "general",
                        "inputName": "shortDescription",
                        "type": "textarea"
                    },
                    "act": {
                    	"label": "Act",
                        "order": 3,
                        "fieldset": "general",
                        "inputName": "act",
                        "type": "select",
                        "options": [
                            "Prologue",
                            "Act 1",
                            "Act 2",
                            "Act 3",
                            "Epilogue"
                        ]
                    },
                    "position": {
                        "label": "Position in Sequence",
                    	"order": 4,
                    	"fieldset": "general",
                        "inputName": "posInSeq",
                        "type": "text"
                    },
                    "datetime": {
                    	"label": "Time (date, time, or ballpark)",
                        "order": 1,
                        "fieldset": "time and place",
                        "inputName": "time",
                        "type": "text"
                    },
                    "place": {
                    	"label": "Location",
                        "order": 2,
                        "fieldset": "time and place",
                        "inputName": "location",
                        "type": "hidden",
                        "pickerType": "radio"
                    },
                    "importance": {
                    	"label": "Importance",
                    	"order": 1,
                    	"fieldset": "importance",
					    "inputName": "importance",
					    "type": "select",
					    "options": [
				            5,
				            4,
				            3,
				            2,
				            1
					    ]
					},
                    "tension": {
                    	"label": "Tension",
                    	"order": 2,
                    	"fieldset": "importance",
					    "inputName": "tension",
					    "type": "select",
					    "options": [
					        10,
					        9,
					        8,
					        7,
					        6,
					        5,
					        4,
					        3,
					        2,
					        1
					    ]
                    },
                    "characters": {
			            "label": "Characters involved in scene",
			            "order": 1,
			            "fieldset": "characters",
			            "inputName": "characters",
			            "type": "hidden",
			            "pickerType": "checkbox"
			        }
                }
	        },
	        {
	            "name": "Characters",
	            "singularName": "Character",
	            "associateCharactersAndLocations": false,
	            "componentIndex": 1,
	            "fieldsets": {
	            	"personalInfo": {
	            		"name": "personalInfo",
	            		"title": "Personal Information",
	            		"order": 1
	            	},
	            	"relevance": {
	            		"name": "relevance",
	            		"title": "Relevance",
	            		"order": 2
	            	},
	            	"education": {
	            		"name": "education",
	            		"title": "Education",
	            		"order": 5
	            	},
	            	"about": {
	            		"name": "about",
	            		"title": "About",
	            		"order": 3
	            	},
	            	"associates": {
	            		"name": "associates",
	            		"title": "Associates",
	            		"order": 4
	            	}
	            },
	            "fields": {
	            	"name": {
                        "label": "Name",
                    	"order": 1,
                    	"fieldset": "personalInfo",
                        "inputName": "name",
                        "type": "text"
                    },
                    "age": {
                        "label": "Age",
                    	"order": 2,
                    	"fieldset": "personalInfo",
                        "inputName": "age",
                        "type": "number"
                    },
                    "address": {
                        "label": "Address",
                    	"order": 3,
                    	"fieldset": "personalInfo",
                        "inputName": "address",
                        "type": "textarea"
                    },
					"occupation": {
                        "label": "Occupation",
                    	"order": 4,
                    	"fieldset": "personalInfo",
                        "inputName": "occupation",
                        "type": "text"
                    },
                    "gender": {
                        "label": "Gender",
                    	"order": 5,
                    	"fieldset": "personalInfo",
                        "inputName": "gender",
                        "type": "select",
                        "options": [
                        	'Male',
                        	'Female'
                        ]
                    },
                    "school": {
                        "label": "School",
                    	"order": 1,
                    	"fieldset": "education",
                        "inputName": "school",
                        "type": "textarea"
                    },
                    "college": {
                        "label": "College",
                    	"order": 2,
                    	"fieldset": "education",
                        "inputName": "college",
                        "type": "textarea"
                    },
                    "university": {
                        "label": "University",
                    	"order": 3,
                    	"fieldset": "education",
                        "inputName": "university",
                        "type": "textarea"
                    },
                    "academic": {
                        "label": "Achievements",
                    	"order": 1,
                    	"fieldset": "about",
                        "inputName": "achievements",
                        "type": "textarea"
                    },
                    "skills": {
                        "label": "Skills",
                    	"order": 2,
                    	"fieldset": "about",
                        "inputName": "skills",
                        "type": "textarea"
                    },
                    "interests": {
                        "label": "Interests",
                    	"order": 3,
                    	"fieldset": "about",
                        "inputName": "interests",
                        "type": "textarea"
                    },
                    "family": {
                        "label": "Family",
                    	"order": 1,
                    	"fieldset": "associates",
                        "inputName": "family",
                        "type": "hidden",
                        "pickerType": "checkbox"
                    },
                    "friends": {
                        "label": "Friends",
                    	"order": 1,
                    	"fieldset": "associates",
                        "inputName": "friends",
                        "type": "hidden",
                        "pickerType": "checkbox"
                    },
                    "importance": {
                    	"info": "Primary characters are main characters; they are crucial to the story. Secondary characters are characters that feature in the story, but are not necessarily crucial to the events. Tertiary characters may not even feature in the story, but may be mentioned / implied by relationships to primary or secondary characters.",
                        "label": "Importance",
                    	"order": 1,
                    	"fieldset": "relevance",
                        "inputName": "importance",
                        "type": "select",
                        "options": [
                        	'Primary',
                        	'Secondary',
                        	'Tertiary'
                        ]
                    },
	            }
	        },
	        {
	            "name": "Locations",
	            "singularName": "Location",
	            "associateCharactersAndLocations": false,
	            "componentIndex": 2,
	            "fieldsets": {
	            	"locationInfo": {
	            		"name": "locationInfo",
	            		"title": "Location Details",
	            		"order": 1
	            	},
	            	"buildingInfo": {
	            		"name": "buildingInfo",
	            		"title": "Building Details",
	            		"order": 2
	            	},
	            	"notes": {
	            		"name": "notes",
	            		"title": "Notes",
	            		"order": 3
	            	},
	            },
	            "fields": {
	            	"locationName": {
                        "label": "Name",
                    	"order": 1,
                    	"fieldset": "locationInfo",
                        "inputName": "location-name",
                        "type": "text"
                    },
                    "country": {
                        "label": "Country",
                    	"order": 2,
                    	"fieldset": "locationInfo",
                        "inputName": "country",
                        "type": "text"
                    },
                    "co-ords": {
                        "label": "Co-ordinates",
                    	"order": 3,
                    	"fieldset": "locationInfo",
                        "inputName": "co-ords",
                        "type": "text"
                    },
                    "buildingName": {
                        "label": "Building Name",
                    	"order": 1,
                    	"fieldset": "buildingInfo",
                        "inputName": "building-name",
                        "type": "text"
                    },
                    "address": {
                        "label": "Address",
                    	"order": 2,
                    	"fieldset": "buildingInfo",
                        "inputName": "address",
                        "type": "textarea"
                    },
                    "purpose": {
                        "label": "Purpose",
                    	"order": 3,
                    	"fieldset": "buildingInfo",
                        "inputName": "purpose",
                        "type": "select",
                        "options": [
                        	'Multi-purpose',
                        	'Residential',
                        	'Business',
                        	'Social'
                        ]
                    },
                    "size": {
                        "label": "Size",
                    	"order": 4,
                    	"fieldset": "buildingInfo",
                        "inputName": "size",
                        "type": "text"
                    },
                    "floors": {
                        "label": "Floors",
                    	"order": 5,
                    	"fieldset": "buildingInfo",
                        "inputName": "floors",
                        "type": "number"
                    },
                    "occupants": {
                        "label": "Occupants",
                    	"order": 6,
                    	"fieldset": "buildingInfo",
                        "inputName": "occupants",
                        "type": "text"
                    },
                    "utilities": {
                        "label": "Utilities",
                    	"order": 7,
                    	"fieldset": "buildingInfo",
                        "inputName": "utilities",
                        "type": "hidden",
                        "pickerType": "checkbox"
                    },
                    "notes": {
                        "label": "Notes",
                    	"order": 1,
                    	"fieldset": "notes",
                        "inputName": "notes",
                        "type": "textarea"
                    },
               }
	        }
		];

	}]);

})();