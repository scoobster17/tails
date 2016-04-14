(function(){

	angular.module('tailsApp')

	.factory('TextFactory', ['$resource', function($resource) {
		return $resource('/text');
	}]);

})();