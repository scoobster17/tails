(function(){

	angular.module('tailsApp')

	/**
	 * Controller for the Author's Personal Info page
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
	 * @param  {dependency} constants  	 App constants
	 */
	.controller('authorPersonalInfoCtrl', ['$scope', '$rootScope', 'TextFactory', 'constants', function($scope, $rootScope, TextFactory, constants) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Personal Info', 'Author']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.author.personalInfo;
		});

		// page data and regex's for form validation
		$scope.year = $rootScope.date.getFullYear();
		$scope.regex = constants.regex;

	}]);

})();