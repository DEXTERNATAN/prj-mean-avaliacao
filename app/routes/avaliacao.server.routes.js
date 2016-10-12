'use strict';

module.exports = function(app) {

	var avaliacao = require('../../app/controllers/avaliacao.server.controller');
	//var users = require('../controllers/users.server.controller');
	//var apiAuth = require('../controllers/api.authorization.server.controller');

	app.route('/avaliacao')
		.get(avaliacao.list)
		.post(avaliacao.create);

	app.route('/avaliacao/:avaliacaoId')
		.get(avaliacao.read)
		.put(avaliacao.update)
		.delete(avaliacao.delete);

	// Finish by binding the article middleware
	//app.param('avaliacaoId', avaliacao.getByID);		

};