/**
 * Check the Personal Info page
 */
describe("Personal Info Page", function() {

	beforeEach(module('tailsApp'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		homeCtrl = $controller('authorPersonalInfoCtrl', { $scope: scope })
	}));

	describe(' - authorPersonalInfoCtrl functionality', function() {

		/**
		 * Check the year is supplied for the validation of the year field
		 */
		describe(' - year checks', function() {

			// check this value is supplied as is vital for year validation
			it("Check rootscope year value exists", function() {
				expect(scope.year).toBeDefined();
			});

			// check this value is a number so is a valid value to be checked
			it("Check modalOptions is object", function() {
				expect(angular.isNumber(scope.year)).toBe(true);
			});

		});

		/**
		 * Check that regex tests are supplied to the controller for validation
		 */
		describe(" - Check regexes are available", function() {

			// Check there is a value for the regex item in scope
			it("Check regex object exists", function() {
				expect(scope.regex).toBeDefined();
			});

			// check that the regex item is of type object and can therefore
			// store all the validation patterns
			it("Check regex rootScope value is an object", function() {
				expect(angular.isObject(scope.regex)).toBe(true);
			});

			// check there is a validation pattern supplied for first name
			it("Check regex for first name to be supplied", function() {
				expect(angular.isDefined(scope.regex.firstName)).toBe(true);
			});

			// check there is a validation pattern supplied for last name
			it("Check regex for last name to be supplied", function() {
				expect(angular.isDefined(scope.regex.lastName)).toBe(true);
			});

			// check there is a validation pattern supplied for date field
			it("Check regex for date of birth (date) to be supplied", function() {
				expect(angular.isDefined(scope.regex.dateOfBirth.date)).toBe(true);
			});

			// check there is a validation pattern supplied for month field
			it("Check regex for date of birth (month) to be supplied", function() {
				expect(angular.isDefined(scope.regex.dateOfBirth.month)).toBe(true);
			});

			// check there is a validation pattern supplied for year field
			it("Check regex for date of birth (year) to be supplied", function() {
				expect(angular.isDefined(scope.regex.dateOfBirth.year)).toBe(true);
			});

			// check there is a validation pattern supplied for first line
			it("Check regex for address (first line) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.firstLine)).toBe(true);
			});

			// check there is a validation pattern supplied for second line
			it("Check regex for address (second line) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.secondLine)).toBe(true);
			});

			// check there is a validation pattern supplied for third line
			it("Check regex for address (third line) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.thirdLine)).toBe(true);
			});

			// check there is a validation pattern supplied for town
			it("Check regex for address (town) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.town)).toBe(true);
			});

			// check there is a validation pattern supplied for county
			it("Check regex for address (county) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.county)).toBe(true);
			});

			// check there is a validation pattern supplied for country
			it("Check regex for address (country) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.country)).toBe(true);
			});

			// check there is a validation pattern supplied for postcode
			it("Check regex for address (postcode) to be supplied", function() {
				expect(angular.isDefined(scope.regex.address.postcode)).toBe(true);
			});

		});

	});

});