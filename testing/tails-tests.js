describe("Check Controller: homeCtrl", function() {

	beforeEach(module('tailsApp'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		homeCtrl = $controller('homeCtrl', { $scope: scope })
	}));

	describe('homeCtrl functionality', function() {

		it("Check modalOptions exists", function() {
			expect(scope.modalOptions).toBeDefined();
		});

		it("Check modalOptions is object", function() {
			expect(angular.isObject(scope.modalOptions)).toBe(true);
		});

	});

});