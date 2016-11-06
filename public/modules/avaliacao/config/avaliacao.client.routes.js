'use strict';

//Setting up route
angular.module('avaliacao').config(['$stateProvider',
	function($stateProvider) {
		// Avaliacao state routing
		$stateProvider.
		state('edit-avaliacao', {
			url: '/avaliacao/:avaliacaoId/edit',
			templateUrl: 'modules/avaliacao/views/edit-avaliacao.client.view.html'
		}).
		state('list-avaliacao', {
			url: '/list-avaliacao',
			templateUrl: 'modules/avaliacao/views/list-avaliacao.client.view.html'
		}).
		state('create-avaliacao', {
			url: '/avaliacao/create',
			templateUrl: 'modules/avaliacao/views/create-avaliacao.client.view.html'
		}).
		state('avaliacao', {
			url: '/avaliacao/:avaliacaoId',
			templateUrl: 'modules/avaliacao/views/avaliacao.client.view.html'
		});
	}
]);