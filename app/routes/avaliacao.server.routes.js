'use strict';

module.exports = function(app) {

	var avaliacao = require('../../app/controllers/avaliacao.server.controller');
	
	app.route('/avaliacao')
		.get(avaliacao.list)
		.post(avaliacao.create);

	app.route('/avaliacao/:avaliacaoId')
   		.get(avaliacao.read);

};