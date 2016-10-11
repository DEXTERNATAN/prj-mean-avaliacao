'use strict';

module.exports = function(app) {
	// Routing logic   
	var divisao = require('../../app/controllers/divisao.server.controller');

	app.route('/divisao')
	  .get(divisao.list);
	  //.post(divisao.create);

	// the categoryId param is added to the params object for the request
    // app.route('/divisao/:divisaoId')
   	// .get(divisao.read);

};