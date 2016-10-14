'use strict';

//Setting up route
angular.module('papel').config(['$stateProvider',
	function($stateProvider) {
		// Papel state routing
		$stateProvider.
		state('papel', {
			url: '/papel/create',
			templateUrl: 'modules/papel/views/papel.client.view.html'
		});
	}
]);