(function(){

	// defining app dependencies
	angular.module('tailsApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap', 'angular-spinkit'])

	/**
	 * Defining constants for use throughout the app
	 */
	.constant("constants", {
		"appName": "Tails",
		"creator": "Phil Gibbins",
		"regex": {
			"firstName": /^[a-z\- ]+$/i,
			"lastName":  /^[a-z\- ]+$/i,
			"dateOfBirth": {
				"date": /^(0?[1-9])|([1-2]?[0-9])|(3[01]])$/,
				"month": /^(0?[1-9])|(1[12])$/,
				"year": /^(19[1-9][0-9])|(20(0[0-9]|1[0-6]))$/
			},
			"address": {
				"firstLine": /^[a-z0-9\- ]+$/i,
				"secondLine": /^[a-z0-9\- ]+$/i,
				"thirdLine": /^[a-z0-9\- ]+$/i,
				"town": /^[a-z\- ]+$/i,
				"county": /^[a-z\- ]+$/i,
				"country": /^[a-z\- ]+$/i,
				"postcode": /^([a-z]{1,2}[0-9][a-z0-9]? ?[0-9][a-z]{1,2})|([0-9]{5})$/i
			}
		},
		"modalOptions": {
			"addStory": {
				templateUrl: 'js/stories/modals/addStory/addStoryModal.html',
				controller: 'addStoryModalCtrl',
				windowClass: "modal fade in"
			},
			"deleteStory": {
				templateUrl: 'js/stories/modals/deleteStory/deleteStoryModal.html',
				controller: 'deleteStoryModalCtrl',
				windowClass: "modal fade in"
			},
			"deleteComponent": {
				templateUrl: 'js/stories/modals/deleteComponent/deleteComponentModal.html',
				controller: 'deleteComponentModalCtrl',
				windowClass: "modal fade in"
			},
			"addComponentInstance": {
				templateUrl: 'js/stories/modals/addComponentInstance/addComponentInstanceModal.html',
				controller: 'addComponentInstanceModalCtrl',
				windowClass: "modal fade in"
			}
		}
	})

	/**
	 * Defining code that needs to run to setup the app. Features values bound
	 * to the $rootScope.
	 * @param  {dependency} $rootScope
	 * @param  {Object} 	constants
	 * @param  {dependency} $uibModal
	 */
	.run(['$rootScope', 'constants', '$uibModal', function($rootScope, constants, $modal){

		// set the date (for use in the footer for example)
		$rootScope.date = new Date();

		/**
		 * Update the title with the breadcrumb steps passed and the app name
		 * @param  {[array]} breadcrumbArray steps to be shown in the title
		 */
		$rootScope.updateTitle = function(breadcrumbArray) {
			var newTitle = '';
			breadcrumbArray.forEach(function(element, index) {
				newTitle += breadcrumbArray[index] + " | ";
			});
			document.title = newTitle + constants.appName;
		};

		/**
		 * Function to escape HTML from user input
		 * @param  {String} html This is the HTML to be escaped
		 * @return {String}      This is the escaped HTML
		 */
		$rootScope.escapeHtml = function(html) {
			var newHtml = html;
			newHtml = newHtml.replace(/\</g, '&lt;');
			newHmtl = newHtml.replace(/\>/g, '&gt;');
			newHtml = newHtml.replace(/\n/g, '<br />');
			return newHtml;
		};

		/**
		 * Convert a string to be used in a URL, for example the story name.
		 * This does not include encoding; this is for converting spaces to
		 * dashes, and stripping extra whitespace.
		 * @param  {String} str string to be modified
		 * @return {String}     The new String to be used in a URL
		 */
		$rootScope.prepareForUrl = function(str) {

			// get rid of all double spaces to avoid >1 dash
			var dashedString = str.replace(/  /g, ' ');

			// replace each remaining space with an ndash
			dashedString = dashedString.replace(/ /g, '-');

			// ensure the text is lower case for url handling / insensitivity
			dashedString = dashedString.toLowerCase();

			return dashedString;

		};

		/**
		 * Method to intercept a modal being shown to make passed data available
		 * in the modal
		 * @param  {Object} data         Must contain the scope, and any other
		 *                               data that is needed in the modal
		 * @param  {Object} modalOptions Options for the modal for instance
		 *                               template, controller, windowClass
		 */
		$rootScope.showModal = function(data, modalOptions) {
			modalOptions.resolve = {
				data: function() {
					return data;
				}
			};
			data.scope.modalInstance = $modal.open(modalOptions);
		};

		/**
		 * Function to copy properties of an object to another
		 * @param  {Object} objectToCopy      The object to copy properties from
		 * @return {Object}                   The new destination object
		 */
		$rootScope.copyObject = function(objectToCopy) {
			var destinationObject = {};
			for (var prop in objectToCopy) {
				destinationObject[prop] = objectToCopy[prop];
			}
			return destinationObject;
		};

	}]);

})();