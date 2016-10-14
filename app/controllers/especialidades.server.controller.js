'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Especialidade = mongoose.model('Especialidade'),
	_ = require('lodash');

/**
 * Create a Especialidade
 */
exports.create = function(req, res) {
	
	var especialidade = new Especialidade(req.body);
	especialidade.user = req.user;

	especialidade.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(especialidade);
		}
	});
};

/**
 * Show the current Especialidade
 */
exports.read = function(req, res) {
	res.jsonp(req.especialidade);
};

/**
 * Update a Especialidade
 */
exports.update = function(req, res) {
	var especialidade = req.especialidade ;

	especialidade = _.extend(especialidade , req.body);

	especialidade.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(especialidade);
		}
	});
};

/**
 * Delete an Especialidade
 */
exports.delete = function(req, res) {
	var especialidade = req.especialidade ;

	especialidade.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(especialidade);
		}
	});
};

/**
 * List of Especialidades
 */
exports.list = function(req, res) { 
	Especialidade.find().sort('-created').populate('user', 'displayName').exec(function(err, especialidades) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(especialidades);
		}
	});
};

/**
 * Especialidade middleware
 */
exports.especialidadeByID = function(req, res, next, id) { 
	Especialidade.findById(id).populate('user', 'displayName').exec(function(err, especialidade) {
		if (err) return next(err);
		if (! especialidade) return next(new Error('Failed to load Especialidade ' + id));
		req.especialidade = especialidade ;
		next();
	});
};

/**
 * Especialidade authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.especialidade.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
