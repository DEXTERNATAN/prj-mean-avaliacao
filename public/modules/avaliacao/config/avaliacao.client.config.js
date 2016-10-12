'use strict';

// Avaliacao module config
angular.module('avaliacao').run(['Menus',
	function(Menus) {
		// Config logic
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Avaliacao', 'avaliacao', 'dropdown', '/avaliacao(/create)?');
		Menus.addSubMenuItem('topbar', 'avaliacao', 'Nova Avaliação', 'avaliacaocreate');
		Menus.addSubMenuItem('topbar', 'avaliacao', 'List Avaliações', 'list-avaliacao');
		
	}
]);