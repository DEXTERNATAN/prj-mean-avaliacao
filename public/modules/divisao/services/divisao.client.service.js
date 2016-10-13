'use strict';

angular.module('divisao').factory('Divisao', ['$resource',
	function($resource) {
		return $resource('divisao/:divisaoId', { categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);