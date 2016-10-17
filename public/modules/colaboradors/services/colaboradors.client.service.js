'use strict';

//Colaboradors service used to communicate Colaboradors REST endpoints
angular.module('colaboradors').factory('Colaboradors', ['$resource',
	function($resource) {
		return $resource('colaboradors/:colaboradorId', { colaboradorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);