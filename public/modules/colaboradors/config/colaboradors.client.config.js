'use strict';

// Configuring the Articles module
angular.module('colaboradors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Colaborador', 'colaboradors', 'dropdown', '/colaboradors(/create)?');
		Menus.addSubMenuItem('topbar', 'colaboradors', 'Lista Colaborador', 'colaboradors');
		Menus.addSubMenuItem('topbar', 'colaboradors', 'Cadastrar colaborador', 'colaboradors/create');
	}
]);