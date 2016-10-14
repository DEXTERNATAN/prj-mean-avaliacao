'use strict';

angular.module('papel').factory('Papel', ['$resource',
	function($resource) {
		return $resource('papel/:papelId', { categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);