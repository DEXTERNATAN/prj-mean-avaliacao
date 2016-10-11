'use strict';

//Avalition service used to communicate Categories REST endpoints
angular.module('avaliacao').factory('Avaliacao', ['$resource',
	function($resource) {
		return $resource('avaliacao/:avaliacaoId', { avaliacaoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);