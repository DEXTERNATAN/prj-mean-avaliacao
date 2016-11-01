'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Classificacao = require('../../app/models/classificacao.server.model'),
	Schema = mongoose.Schema;

/**
 * Atributo Schema
 */
var AtributoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Atributo name',
		trim: true
	},
	tipo: [],
	classificacao: [],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
	
});

mongoose.model('Atributo', AtributoSchema);