(function(){

	angular.module('tailsApp')

	/**
	 * Controller for Home page
	 * @param {dependency} $scope
	 * @param {dependency} $rootScope
	 * @param {dependency} TextFactory  Factory for retrieving text for page
	 * @param {Object} 	   constants 	App constants object
	 */
	.controller('homeCtrl', ['$scope', '$rootScope', 'TextFactory', 'constants', function($scope, $rootScope, TextFactory, constants) {

		// on view change change the title for accessibility
		$scope.$on('$viewContentLoaded', function() {
			$rootScope.updateTitle(['Home']);
		});

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.home;
		});

		// get the modal options form the constants object
		$scope.modalOptions = constants.modalOptions;

		// bind rootScope show overlay method to ask for initial story details
		$scope.initAddStory = $rootScope.showModal;

	}]);

})();