(function(){

	/**
	 * Defining config in terms of custom filters to be used across the app
	 */
	angular.module('tailsApp')

	/**
	 * Use the $sce service to tell Angular to trust the passed HTML and render
	 * @param  {dependency} $sce
	 */
	.filter('trustHtml', ['$sce', function($sce) {
		return function(str) {
			return $sce.trustAsHtml(str);
		};
	}])

	/**
	 * Use the $location service to construct an absolute URL appending the
	 * string supplied. This is used to form demonstratory URLs.
	 * @param  {dependency} $location
	 */
	.filter('absoluteUrl', ['$location', function($location) {
		return function(str) {
			var absUrlWithoutStory = $location.absUrl().replace(/\/[^\/]+$/i,'');
			return absUrlWithoutStory + '/' + str;
		};
	}])

	/**
	 * Order an object by one of it's properties; used to order fields in
	 * component instance page
	 */
	.filter('orderObjectBy', function() {
		return function(items, field, reverse) {
			var filtered = [];
			angular.forEach(items, function(item) {
				filtered.push(item);
			});
			filtered.sort(function(a, b) {
				return (a[field] > b[field] ? 1 : -1);
			});
			if (reverse) filtered.reverse();
			return filtered;
		}
	})

	/**
	 * Filter an object by one of it's properties; used to filter fileds based
	 * on the parent fieldset on the component instance page
	 * @param  {Array}  ) {		return    function(items, field, fieldset) {			var filtered [description]
	 * @return {[type]}   [description]
	 */
	.filter('filterObjectBy', function() {
		return function(items, field, fieldset) {
			var filtered = [];
			angular.forEach(items, function(item) {
				if (item[field] == fieldset.name) {
					filtered.push(item);
				}
			});
			return filtered;
		}
	});

})();