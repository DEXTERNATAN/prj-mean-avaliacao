'use strict';

// Configuring the Articles module
angular.module('atributos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Atributos', 'atributos', 'dropdown', '/atributos(/create)?');
		Menus.addSubMenuItem('topbar', 'atributos', 'Lista Atributos', 'atributos');
		Menus.addSubMenuItem('topbar', 'atributos', 'Cadastrar Atributo', 'atributos/create');
	}
]);