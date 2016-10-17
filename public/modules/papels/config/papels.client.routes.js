'use strict';

//Setting up route
angular.module('papels').config(['$stateProvider',
	function($stateProvider) {
		// Papels state routing
		$stateProvider.
		state('listPapels', {
			url: '/papels',
			templateUrl: 'modules/papels/views/list-papels.client.view.html'
		}).
		state('createPapel', {
			url: '/papels/create',
			templateUrl: 'modules/papels/views/create-papel.client.view.html'
		}).
		state('viewPapel', {
			url: '/papels/:papelId',
			templateUrl: 'modules/papels/views/view-papel.client.view.html'
		}).
		state('editPapel', {
			url: '/papels/:papelId/edit',
			templateUrl: 'modules/papels/views/edit-papel.client.view.html'
		});
	}
]);