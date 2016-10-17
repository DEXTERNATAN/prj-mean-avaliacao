'use strict';

// Configuring the Articles module
angular.module('papels').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Papel', 'papels', 'dropdown', '/papels(/create)?');
		Menus.addSubMenuItem('topbar', 'papels', 'Lista Papel', 'papels');
		Menus.addSubMenuItem('topbar', 'papels', 'Cadastrar Papel', 'papels/create');
	}
]);