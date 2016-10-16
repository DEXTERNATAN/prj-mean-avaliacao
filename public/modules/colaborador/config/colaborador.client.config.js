'use strict';

// Colaborador module config
angular.module('colaborador').run(['Menus',
	function(Menus) {
		// Config logic
		Menus.addMenuItem('topbar', 'Colaborador', 'colaborador', 'dropdown', '/colaborador(/create)?');
		Menus.addSubMenuItem('topbar', 'colaborador', 'Novo colaborador', 'colaborador/create');
		Menus.addSubMenuItem('topbar', 'colaborador', 'Lista colaboradores', 'lista-colaborador');
	}
]);