'use strict';

// Divisao module config
angular.module('divisao').run(['Menus',
	function(Menus) {
		// Config logic
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Divisao', 'divisao', 'dropdown', '/divisao(/create)?');
		// Menus.addSubMenuItem('topbar', 'divisao', 'List Divisão', 'divisao');
		Menus.addSubMenuItem('topbar', 'divisao', 'Nova divisão', 'create-divisao');
	
	}
]);