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
	
	// var divisao = new Divisao(req.body);

	// divisao.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.status(201).json(divisao);
	// 	}
	// });	

};

/**
 * Show the current Divisao
 */
exports.read = function(req, res) {
	// Divisao.findById(req.params.divisaoId).exec(function(err, divisao) {
	// 	if (err) {
	//       return res.status(400).send({
	//           message: errorHandler.getErrorMessage(err)
	//       });
 //      } else {
 //         if (!divisao) {
	// 			return res.status(404).send({
 //  					message: 'Category not found'
 //  				});
	// 		}
	// 		res.json(divisao);
 //      }
	// });
};

/**
 * Update a Divisao
 */
exports.update = function(req, res) {

};

/**
 * Delete an Divisao
 */
exports.delete = function(req, res) {

};

/**
 * List of Divisaos
 */
exports.list = function(req, res) {
	Divisao.find().exec(function(err, divisao) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(divisao);
        }
    });
};