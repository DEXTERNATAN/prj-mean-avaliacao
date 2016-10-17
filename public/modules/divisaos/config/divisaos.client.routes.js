'use strict';

//Setting up route
angular.module('divisaos').config(['$stateProvider',
	function($stateProvider) {
		// Divisaos state routing
		$stateProvider.
		state('listDivisaos', {
			url: '/divisaos',
			templateUrl: 'modules/divisaos/views/list-divisaos.client.view.html'
		}).
		state('createDivisao', {
			url: '/divisaos/create',
			templateUrl: 'modules/divisaos/views/create-divisao.client.view.html'
		}).
		state('viewDivisao', {
			url: '/divisaos/:divisaoId',
			templateUrl: 'modules/divisaos/views/view-divisao.client.view.html'
		}).
		state('editDivisao', {
			url: '/divisaos/:divisaoId/edit',
			templateUrl: 'modules/divisaos/views/edit-divisao.client.view.html'
		});
	}
]);