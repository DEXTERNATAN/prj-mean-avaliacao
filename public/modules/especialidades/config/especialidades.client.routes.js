'use strict';

//Setting up route
angular.module('especialidades').config(['$stateProvider',
	function($stateProvider) {
		// Especialidades state routing
		$stateProvider.
		state('listEspecialidades', {
			url: '/especialidades',
			templateUrl: 'modules/especialidades/views/list-especialidades.client.view.html'
		}).
		state('createEspecialidade', {
			url: '/especialidades/create',
			templateUrl: 'modules/especialidades/views/create-especialidade.client.view.html'
		}).
		state('viewEspecialidade', {
			url: '/especialidades/:especialidadeId',
			templateUrl: 'modules/especialidades/views/view-especialidade.client.view.html'
		}).
		state('editEspecialidade', {
			url: '/especialidades/:especialidadeId/edit',
			templateUrl: 'modules/especialidades/views/edit-especialidade.client.view.html'
		});
	}
]);