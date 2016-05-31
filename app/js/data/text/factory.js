(function(){

	angular.module('tailsApp')

	/**
	 * Factory to retrieve text data to show in views. The text is stored in a
	 * JSON format so as to leave open the possibility of internationalization.
	 * @param  {dependency} $resource
	 */
	.factory('TextFactory', ['$resource', function($resource) {
		return $resource('/text');
	}]);

})();