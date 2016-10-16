'use strict';

//Setting up route
angular.module('colaborador').config(['$stateProvider',
	function ($stateProvider) {
		// Colaborador state routing
		$stateProvider.
			state('lista-colaborador', {
				url: '/lista-colaborador',
				templateUrl: 'modules/colaborador/views/lista-colaborador.client.view.html'
			}).

			state('colaborador', {
				url: '/colaborador/create',
				templateUrl: 'modules/colaborador/views/colaborador.client.view.html'
			});
	}
]);