'use strict';

angular.module('colaborador').factory('Colaborador', ['$resource',
	function($resource) {
		return $resource('colaborador/:colaboradorId', { colaboradorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);