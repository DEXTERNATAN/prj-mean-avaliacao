'use strict';

//Especialidades service used to communicate Especialidades REST endpoints
angular.module('especialidades').factory('Especialidades', ['$resource',
	function($resource) {
		return $resource('especialidades/:especialidadeId', { especialidadeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);