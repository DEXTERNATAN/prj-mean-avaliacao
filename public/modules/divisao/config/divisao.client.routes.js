'use strict';

//Setting up route
angular.module('divisao').config(['$stateProvider',
	function($stateProvider) {
		// Divisao state routing
		$stateProvider.
		state('create-divisao', {
			url: '/create-divisao',
			templateUrl: 'modules/divisao/views/create-divisao.client.view.html'
		}).
		state('divisao', {
			url: '/divisao',
			templateUrl: 'modules/divisao/views/divisao.client.view.html'
		});
	}
]);