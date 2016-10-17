'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var papels = require('../../app/controllers/papels.server.controller');

	// Papels Routes
	app.route('/papels')
		.get(papels.list)
		.post(users.requiresLogin, papels.create);

	app.route('/papels/:papelId')
		.get(papels.read)
		.put(users.requiresLogin, papels.hasAuthorization, papels.update)
		.delete(users.requiresLogin, papels.hasAuthorization, papels.delete);

	// Finish by binding the Papel middleware
	app.param('papelId', papels.papelByID);
};
