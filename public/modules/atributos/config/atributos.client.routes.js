'use strict';

//Setting up route
angular.module('atributos').config(['$stateProvider',
	function($stateProvider) {
		// Atributos state routing
		$stateProvider.
		state('listAtributos', {
			url: '/atributos',
			templateUrl: 'modules/atributos/views/list-atributos.client.view.html'
		}).
		state('createAtributo', {
			url: '/atributos/create',
			templateUrl: 'modules/atributos/views/create-atributo.client.view.html'
		}).
		state('viewAtributo', {
			url: '/atributos/:atributoId',
			templateUrl: 'modules/atributos/views/view-atributo.client.view.html'
		}).
		state('editAtributo', {
			url: '/atributos/:atributoId/edit',
			templateUrl: 'modules/atributos/views/edit-atributo.client.view.html'
		});
	}
]);