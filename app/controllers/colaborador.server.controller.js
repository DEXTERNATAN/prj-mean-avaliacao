'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Colaborador = mongoose.model('Colaborador'),
    _ = require('lodash');

/**
 * Create a Colaborador
 */
exports.create = function(req, res) {

	var colaborador = new Colaborador(req.body);

	colaborador.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(colaborador);
		}
	});		

};

/**
 * Show the current Colaborador
 */
exports.read = function(req, res) {

};

/**
 * Update a Colaborador
 */
exports.update = function(req, res) {

};

/**
 * Delete an Colaborador
 */
exports.delete = function(req, res) {

};

/**
 * List of Colaboradors
 */
exports.list = function(req, res) {

		Colaborador.find().exec(function(err, colaborador) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(colaborador);
        }
    });

};