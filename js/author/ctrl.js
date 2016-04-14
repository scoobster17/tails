(function(){

	angular.module('tailsApp')

	/**
	 * Controller for Author page
	 * @param  {[dependency]} $scope
	 * @param  {[dependency]} TextFactory  Factory for retrieving text for page
	 */
	.controller('authorCtrl', ['$scope', 'TextFactory', function($scope, TextFactory){

		// get page text
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.author;
		});

	}]);

})();