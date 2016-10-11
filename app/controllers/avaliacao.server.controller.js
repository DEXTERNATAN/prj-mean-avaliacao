'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Avaliacao = mongoose.model('Avaliacao'),
    _ = require('lodash');

/**
 * Create a Avaliacao
 */
exports.create = function(req, res) {

	console.log('CREATE');
    var avaliacao = new Avaliacao(req.body);

	avaliacao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(avaliacao);
		}
	});

};

/**
 * Show the current Avaliacao
 */
exports.read = function(req, res) {

    Avaliacao.findById(req.params.avaliacaoId).exec(function(err, avaliacao) {
		if (err) {
	      return res.status(400).send({
	          message: errorHandler.getErrorMessage(err)
	      });
      } else {
         if (!avaliacao) {
				return res.status(404).send({
  					message: 'Category not found'
  				});
			}
			res.json(avaliacao);
      }
	});

};

/**
 * Update a Avaliacao
 */
exports.update = function(req, res) {

};

/**
 * Delete an Avaliacao
 */
exports.delete = function(req, res) {

};

/**
 * List of Avaliacaos
 */
exports.list = function(req, res) {
	// Avaliacao.find().exec(function(err, avaliacao) {
 //        if (err) {
 //            return res.status(400).send({
 //                message: errorHandler.getErrorMessage(err)
 //            });
 //        } else {
 //            res.json(avaliacao);
 //        }
 //    });
 	//res.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
};