'use strict';

//Setting up route
angular.module('avaliacao').config(['$stateProvider',
	function($stateProvider) {
		// Avaliacao state routing
		$stateProvider.
		state('create-avaliacao', {
			url: '/avaliacaocreate',
			templateUrl: 'modules/avaliacao/views/create-avaliacao.client.view.html'
		}).
		state('avaliacao', {
			url: '/avaliacao',
			templateUrl: 'modules/avaliacao/views/avaliacao.client.view.html'
		});
	}
]);