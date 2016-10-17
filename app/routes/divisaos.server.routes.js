'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var divisaos = require('../../app/controllers/divisaos.server.controller');

	// Divisaos Routes
	app.route('/divisaos')
		.get(divisaos.list)
		.post(users.requiresLogin, divisaos.create);

	app.route('/divisaos/:divisaoId')
		.get(divisaos.read)
		.put(users.requiresLogin, divisaos.hasAuthorization, divisaos.update)
		.delete(users.requiresLogin, divisaos.hasAuthorization, divisaos.delete);

	// Finish by binding the Divisao middleware
	app.param('divisaoId', divisaos.divisaoByID);
};
