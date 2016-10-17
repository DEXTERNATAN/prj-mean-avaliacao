'use strict';

//Divisaos service used to communicate Divisaos REST endpoints
angular.module('divisaos').factory('Divisaos', ['$resource',
	function($resource) {
		return $resource('divisaos/:divisaoId', { divisaoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);