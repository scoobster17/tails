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
		}
	})

	.run(function($rootScope, constants){

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

	});

})();