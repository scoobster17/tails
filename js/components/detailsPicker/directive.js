(function() {

	angular.module('tailsApp')

	.directive('detailsPicker', ['$timeout', function($timeout) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/detailsPicker.html',
			controller: 'detailsPickerCtrl',
			scope: {
				update: '=update',
				pickerType: '@pickerType',
				pickerOptions: '=pickerOptions'
			},
			link: function($scope) {
				$timeout(function() {

					// get the fields to update and check
					var $fieldToUpdate   = $('#' + $scope.update.inputName);
					var $fieldsetToCheck = $fieldToUpdate.next();
					var $fieldsToCheck   = $fieldsetToCheck.find('input');

					// when one of the fields is selected or unselected
					$fieldsToCheck.change(function() {

						var newValue = '';

						// get all fields that are checked
						var $checkedFields = $fieldsetToCheck.find('input:checked');

						// add each checked fields' value to a new empty string
						$checkedFields.each(function() {
							newValue += $(this).data('text') + ', ';
						});

						// cut the last ', ' off the string
						newValue = newValue.substring(0, newValue.length - 2);

						// update the input with the newly constructed value
						$fieldToUpdate.val(newValue);
					});
				});
			}
		};
	}]);

})();