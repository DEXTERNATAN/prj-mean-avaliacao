'use strict';

module.exports = function(app) {
	// Routing logic 
	var papel = require('../../app/controllers/papel.server.controller');

	app.route('/papel')
	  .get(papel.list)
	  .post(papel.create);

	// the categoryId param is added to the params object for the request
    // app.route('/papel/:papelId')
   	// .get(papel.read);
};