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
	tipo: [],
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