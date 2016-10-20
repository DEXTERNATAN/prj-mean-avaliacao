'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Colaborador = mongoose.model('Colaborador'),
	Especialidade = mongoose.model('Especialidade'),
	_ = require('lodash');

/**
 * Create a Colaborador
 */
exports.create = function(req, res) {
	var colaborador = new Colaborador(req.body);
	colaborador.especialidade = req.body.especialidade;

	colaborador.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
				//message: JSON.stringify({error: err.message})
			});
	 		//res.send(JSON.stringify({error: err.message}));
		} else {
			res.json(colaborador);
		}
	});
};

/**
 * Show the current Colaborador
 */
exports.read = function(req, res) {
	res.jsonp(req.colaborador);
};

/**
 * Update a Colaborador
 */
exports.update = function(req, res) {
	var colaborador = req.colaborador ;

	colaborador = _.extend(colaborador , req.body);

	colaborador.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(colaborador);
		}
	});
};

/**
 * Delete an Colaborador
 */
exports.delete = function(req, res) {
	var colaborador = req.colaborador ;

	colaborador.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(colaborador);
		}
	});
};

/**
 * List of Colaboradors
 */
exports.list = function(req, res) { 
	Colaborador.find().sort('-created').populate('Especialidade', 'name').exec(function(err, colaboradors) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(colaboradors);
		}
	});
};

/**
 * Colaborador middleware
 */
exports.colaboradorByID = function(req, res, next, id) { 
	Colaborador.findById(id).populate('Especialidade', 'name').exec(function(err, colaborador) {
		if (err) return next(err);
		if (! colaborador) return next(new Error('Failed to load Colaborador ' + id));
		req.colaborador = colaborador ;
		next();
	});
};

/**
 * Colaborador authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.colaborador.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
