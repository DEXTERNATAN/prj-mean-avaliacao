'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var atributos = require('../../app/controllers/atributos.server.controller');

	// Atributos Routes
	app.route('/atributos')
		.get(atributos.list)
		.post(users.requiresLogin, atributos.create);

	app.route('/atributos/:atributoId')
		.get(atributos.read)
		.put(users.requiresLogin, atributos.hasAuthorization, atributos.update)
		.delete(users.requiresLogin, atributos.hasAuthorization, atributos.delete);

	// Finish by binding the Atributo middleware
	app.param('atributoId', atributos.atributoByID);
};
