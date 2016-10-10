'use strict';

module.exports = function(app) {
	var avaliacao = require('../../app/controllers/avaliacao.server.controller');
	
	// app.route('/avaliacao')
	//  	.get(function (request, response) {
	//  		response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
	// });
	

	app.route('/avaliacao')
	.get(avaliacao.list);
};