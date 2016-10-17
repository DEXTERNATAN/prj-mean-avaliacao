'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Divisao = mongoose.model('Divisao'),
	_ = require('lodash');

/**
 * Create a Divisao
 */
exports.create = function(req, res) {
	var divisao = new Divisao(req.body);
	divisao.user = req.user;

	divisao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(divisao);
		}
	});
};

/**
 * Show the current Divisao
 */
exports.read = function(req, res) {
	res.jsonp(req.divisao);
};

/**
 * Update a Divisao
 */
exports.update = function(req, res) {
	var divisao = req.divisao ;

	divisao = _.extend(divisao , req.body);

	divisao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(divisao);
		}
	});
};

/**
 * Delete an Divisao
 */
exports.delete = function(req, res) {
	var divisao = req.divisao ;

	divisao.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(divisao);
		}
	});
};

/**
 * List of Divisaos
 */
exports.list = function(req, res) { 
	Divisao.find().sort('-created').populate('user', 'displayName').exec(function(err, divisaos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(divisaos);
		}
	});
};

/**
 * Divisao middleware
 */
exports.divisaoByID = function(req, res, next, id) { 
	Divisao.findById(id).populate('user', 'displayName').exec(function(err, divisao) {
		if (err) return next(err);
		if (! divisao) return next(new Error('Failed to load Divisao ' + id));
		req.divisao = divisao ;
		next();
	});
};

/**
 * Divisao authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.divisao.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
