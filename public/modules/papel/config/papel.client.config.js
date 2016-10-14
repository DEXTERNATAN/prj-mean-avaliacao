'use strict';

// Papel module config
angular.module('papel').run(['Menus',
	function(Menus) {
		// Config logic
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Papel', 'papel', 'dropdown', '/papel(/create)?');
		// Menus.addSubMenuItem('topbar', 'papel', 'Lista Papeis', 'papel');
		Menus.addSubMenuItem('topbar', 'papel', 'Novo papel', 'papel/create');
	
	}
]);