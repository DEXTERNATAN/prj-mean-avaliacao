'use strict';

//Papels service used to communicate Papels REST endpoints
angular.module('papels').factory('Papels', ['$resource',
	function($resource) {
		return $resource('papels/:papelId', { papelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);