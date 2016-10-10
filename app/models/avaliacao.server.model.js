'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

/**
 * Avaliacao Schema
 */
 var AvaliacaoSchema = new Schema({
	// firstName: {
	// 	type: String,
	// 	trim: true,
	// 	default: '',
	// 	validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	// },
	// lastName: {
	// 	type: String,
	// 	trim: true,
	// 	default: '',
	// 	validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	// },
	// displayName: {
	// 	type: String,
	// 	trim: true
	// },
	// email: {
	// 	type: String,
	// 	trim: true,
	// 	default: '',
	// 	validate: [validateLocalStrategyProperty, 'Please fill in your email'],
	// 	match: [/.+\@.+\..+/, 'Please fill a valid email address']
	// }
});

 mongoose.model('Avaliacao', AvaliacaoSchema);