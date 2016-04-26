(function(){

	angular.module('tailsApp')

	/**
	 * Controller for Home page
	 * @param  {dependency} $scope
	 * @param  {dependency} $rootScope
	 * @param  {dependency} TextFactory  Factory for retrieving text for page
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

		$scope.modalOptions = constants.modalOptions;

		// show overlay to ask for initial story details
		$scope.initAddStory = $rootScope.showModal;

	}]);

})();