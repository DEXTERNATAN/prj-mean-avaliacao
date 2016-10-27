'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Atributo = mongoose.model('Atributo'),
	_ = require('lodash');

/**
 * Create a Atributo
 */
exports.create = function(req, res) {
	var atributo = new Atributo(req.body);
	atributo.user = req.user;

	atributo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(atributo);
		}
	});
};

/**
 * Show the current Atributo
 */
exports.read = function(req, res) {
	res.jsonp(req.atributo);
};

/**
 * Update a Atributo
 */
exports.update = function(req, res) {
	var atributo = req.atributo ;

	atributo = _.extend(atributo , req.body);

	atributo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(atributo);
		}
	});
};

/**
 * Delete an Atributo
 */
exports.delete = function(req, res) {
	var atributo = req.atributo ;

	atributo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(atributo);
		}
	});
};

/**
 * List of Atributos
 */
exports.list = function(req, res) { 
	Atributo.find().sort('-created').populate('user', 'displayName').exec(function(err, atributos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(atributos);
		}
	});
};

/**
 * Atributo middleware
 */
exports.atributoByID = function(req, res, next, id) { 
	Atributo.findById(id).populate('user', 'displayName').exec(function(err, atributo) {
		if (err) return next(err);
		if (! atributo) return next(new Error('Failed to load Atributo ' + id));
		req.atributo = atributo ;
		next();
	});
};

/**
 * Atributo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.atributo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
