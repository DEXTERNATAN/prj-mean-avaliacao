'use strict';

//Setting up route
angular.module('colaborador').config(['$stateProvider',
	function($stateProvider) {
		// Colaborador state routing
		$stateProvider.
		state('colaborador', {
			url: '/colaboradorcreate',
			templateUrl: 'modules/colaborador/views/colaborador.client.view.html'
		});
	}
]);