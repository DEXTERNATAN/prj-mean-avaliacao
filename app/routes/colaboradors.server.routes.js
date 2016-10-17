'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var colaboradors = require('../../app/controllers/colaboradors.server.controller');

	// Colaboradors Routes
	app.route('/colaboradors')
		.get(colaboradors.list)
		.post(users.requiresLogin, colaboradors.create);

	app.route('/colaboradors/:colaboradorId')
		.get(colaboradors.read)
		.put(users.requiresLogin, colaboradors.hasAuthorization, colaboradors.update)
		.delete(users.requiresLogin, colaboradors.hasAuthorization, colaboradors.delete);

	// Finish by binding the Colaborador middleware
	app.param('colaboradorId', colaboradors.colaboradorByID);
};
