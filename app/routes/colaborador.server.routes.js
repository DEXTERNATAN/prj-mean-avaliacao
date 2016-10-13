'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var colaborador = require('../../app/controllers/colaborador.server.controller');

	app.route('/colaborador')
	  .get(colaborador.list)
	  .post(colaborador.create);

	// the categoryId param is added to the params object for the request
    // app.route('/divisao/:divisaoId')
   	// .get(divisao.read);
};