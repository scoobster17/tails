(function(){

	angular.module('tailsApp', ['ngRoute', 'ngResource'])

	.constant("constants", {
		"appName": "Tails",
		"creator": "Phil Gibbins"
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

	});

})();