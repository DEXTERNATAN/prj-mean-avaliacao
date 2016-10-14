'use strict';

// Configuring the Articles module
angular.module('especialidades').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Especialidades', 'especialidades', 'dropdown', '/especialidades(/create)?');
		Menus.addSubMenuItem('topbar', 'especialidades', 'List Especialidades', 'especialidades');
		Menus.addSubMenuItem('topbar', 'especialidades', 'New Especialidade', 'especialidades/create');
	}
]);