(function(){

	angular.module('tailsApp')

	.controller('homeCtrl', ['$scope', '$rootScope', 'TextFactory', function($scope, $rootScope, TextFactory) {
		var textQuery = TextFactory.query();
		textQuery.$promise.then(function(data) {
			$scope.text = data[0].text.home;
		});
	}]);

})();