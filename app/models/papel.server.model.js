'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Papel Schema
 */
var PapelSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Papel name',
		trim: true
	},
	descricao: {
		type: String,
		default: '',
		required: 'Please fill Papel descricao',
		trim: true
	},	
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Papel', PapelSchema);