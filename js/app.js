(function(){

	angular.module('tailsApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap'])

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
			"addComponentInstance": {
				templateUrl: 'templates/stories/addComponentInstanceModal.html',
				controller: 'addComponentInstanceModalCtrl',
				windowClass: "modal fade in"
			}
		}
	})

	.run(['$rootScope', 'constants', '$uibModal', function($rootScope, constants, $modal){

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
		 * @param  {[type]} html [description]
		 * @return {[type]}      [description]
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

		$rootScope.showModal = function(data, modalOptions) {
			modalOptions.resolve = {
				data: function() {
					return data;
				}
			};
			data.scope.modalInstance = $modal.open(modalOptions);
		};

	}]);

})();