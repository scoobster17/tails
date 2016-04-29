(function() {

	angular.module('tailsApp')

	/**
	 * Directive to render a details picker; better UI than asking a user to
	 * type out all options. This provides either checkboxes or radios which
	 * when checked update the options string in a hidden field.
	 * @param  {dependency} $timeout
	 */
	.directive('detailsPicker', ['$timeout', function($timeout) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/components/detailsPicker.html',
			controller: 'detailsPickerCtrl',
			scope: {
				update: '=update',
				pickerType: '@pickerType',
				pickerOptions: '=pickerOptions',
				editMode: '=editMode'
			},
			link: function($scope) {
				$timeout(function() {

					// get the fields to update and check
					var $fieldToUpdate   = $('#' + $scope.update.inputName);
					var $fieldsetToCheck = $fieldToUpdate.next();
					var $fieldsToCheck   = $fieldsetToCheck.find('input');

					// update the view as per the value
					//var idsToCheck = valueToCheck.split(', ');
					$fieldsToCheck.each(function(){
						console.log($(this));
						/*if ($(this).id in array idsToCheck) {
							$(this).attr('checked', 'checked');
						}*/
					});

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