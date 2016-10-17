'use strict';

// Configuring the Articles module
angular.module('divisaos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Divisão', 'divisaos', 'dropdown', '/divisaos(/create)?');
		Menus.addSubMenuItem('topbar', 'divisaos', 'Lista Divisão', 'divisaos');
		Menus.addSubMenuItem('topbar', 'divisaos', 'Cadastrar divisão', 'divisaos/create');
	}
]);