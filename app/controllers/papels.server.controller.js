'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Papel = mongoose.model('Papel'),
	_ = require('lodash');

/**
 * Create a Papel
 */
exports.create = function(req, res) {
	var papel = new Papel(req.body);
	papel.user = req.user;

	papel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papel);
		}
	});
};

/**
 * Show the current Papel
 */
exports.read = function(req, res) {
	res.jsonp(req.papel);
};

/**
 * Update a Papel
 */
exports.update = function(req, res) {
	var papel = req.papel ;

	papel = _.extend(papel , req.body);

	papel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papel);
		}
	});
};

/**
 * Delete an Papel
 */
exports.delete = function(req, res) {
	var papel = req.papel ;

	papel.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papel);
		}
	});
};

/**
 * List of Papels
 */
exports.list = function(req, res) { 
	Papel.find().sort('-created').populate('user', 'displayName').exec(function(err, papels) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(papels);
		}
	});
};

/**
 * Papel middleware
 */
exports.papelByID = function(req, res, next, id) { 
	Papel.findById(id).populate('user', 'displayName').exec(function(err, papel) {
		if (err) return next(err);
		if (! papel) return next(new Error('Failed to load Papel ' + id));
		req.papel = papel ;
		next();
	});
};

/**
 * Papel authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.papel.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
