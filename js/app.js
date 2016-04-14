(function(){

	angular.module('tailsApp', ['ngRoute', 'ngResource'])

	.constant("constants", {
		"appName": "Tails",
		"creator": "Phil Gibbins"
	})

	.run(function($rootScope){
		$rootScope.date = new Date();
	});

})();