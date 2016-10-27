'use strict';

//Atributos service used to communicate Atributos REST endpoints
angular.module('atributos').factory('Atributos', ['$resource',
	function($resource) {
		return $resource('atributos/:atributoId', { atributoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);