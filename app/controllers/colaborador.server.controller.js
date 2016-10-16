'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Colaborador = mongoose.model('Colaborador'),
	//Especialidade = mongoose.model('Especialidade'),
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
			});
		} else {
			//res.status(201).json(colaborador);
			res.jsonp(colaborador);
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
		//Colaborador.find().exec(function(err, colaborador) {
		Colaborador.find().sort('-created').populate('especialidades', 'name').exec(function(err, colaborador) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(colaborador);
        }
    });
};

exports.colaboradorByID = function(req, res, next, id) { 
	Colaborador.findById(id).populate('especialidade', 'name').exec(function(err, colaborador) {
		if (err) return next(err);
		if (! colaborador) return next(new Error('Failed to load colaborador ' + id));
		req.colaborador = colaborador ;
		next();
	});
};