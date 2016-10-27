'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
	tipo: [{'Tipo':'Abrangencia'}, {'Tipo':'Complexidade'}, {'Tipo':'Impacto'}],
	Classificação: [{'Tipo':'Abrangencia'}, {'Tipo':'Complexidade'}, {'Tipo':'Impacto'}],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Atributo', AtributoSchema);