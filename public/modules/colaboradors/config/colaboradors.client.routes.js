'use strict';

//Setting up route
angular.module('colaboradors').config(['$stateProvider',
	function($stateProvider) {
		// Colaboradors state routing
		$stateProvider.
		state('listColaboradors', {
			url: '/colaboradors',
			templateUrl: 'modules/colaboradors/views/list-colaboradors.client.view.html'
		}).
		state('createColaborador', {
			url: '/colaboradors/create',
			templateUrl: 'modules/colaboradors/views/create-colaborador.client.view.html'
		}).
		state('viewColaborador', {
			url: '/colaboradors/:colaboradorId',
			templateUrl: 'modules/colaboradors/views/view-colaborador.client.view.html'
		}).
		state('editColaborador', {
			url: '/colaboradors/:colaboradorId/edit',
			templateUrl: 'modules/colaboradors/views/edit-colaborador.client.view.html'
		});
	}
]);