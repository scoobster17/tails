describe("Homepage", function() {

	beforeEach(module('tailsApp'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		homeCtrl = $controller('homeCtrl', { $scope: scope })
	}));

	describe(' - homeCtrl functionality', function() {

		describe(' - modalOptions checks', function() {

			it("Check modalOptions exists", function() {
				expect(scope.modalOptions).toBeDefined();
			});

			it("Check modalOptions is object", function() {
				expect(angular.isObject(scope.modalOptions)).toBe(true);
			});

		});

		/*describe(' - homepage text checks', function() {

			it("Check response from text factory", function() {
				expect(scope.text).toBeDefined();
			});

			it("Check text response object is supplied to page", function() {
				expect(angular.isObject(scope.text)).toBe(true);
			});

			describe(' - Check specific text exists', function() {

				it("Check page heading exists", function() {
					expect(angular.isString(scope.text.heading)).toBe(true);
				});

				it("Check page intro exists", function() {
					expect(angular.isString(scope.text.intro)).toBe(true);
				});

			});

		});*/

		describe(" - Check add story functionality available", function() {

			it("initAddStory function available to page", function() {
				expect(angular.isFunction(scope.initAddStory)).toBe(true);
			});

		});

	});

});