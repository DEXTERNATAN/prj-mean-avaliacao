'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Classificacao Schema
 */
var ClassificacaoSchema = new Schema({
	// Classificacao model fields   

	tipo: {
		type: String,
		default: '',
		required: 'Please fill Atributo name',
		trim: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Atributo name',
		trim: true
	}
});

mongoose.model('Classificacao', ClassificacaoSchema);