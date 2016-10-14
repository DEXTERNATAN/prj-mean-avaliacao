'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var especialidades = require('../../app/controllers/especialidades.server.controller');

	// Especialidades Routes
	app.route('/especialidades')
		.get(especialidades.list)
		.post(users.requiresLogin, especialidades.create);

	app.route('/especialidades/:especialidadeId')
		.get(especialidades.read)
		.put(users.requiresLogin, especialidades.hasAuthorization, especialidades.update)
		.delete(users.requiresLogin, especialidades.hasAuthorization, especialidades.delete);

	// Finish by binding the Especialidade middleware
	app.param('especialidadeId', especialidades.especialidadeByID);
};
