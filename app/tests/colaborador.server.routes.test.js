'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Colaborador = mongoose.model('Colaborador'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, colaborador;

/**
 * Colaborador routes tests
 */
describe('Colaborador CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Colaborador
		user.save(function() {
			colaborador = {
				name: 'Colaborador Name'
			};

			done();
		});
	});

	it('should be able to save Colaborador instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Colaborador
				agent.post('/colaboradors')
					.send(colaborador)
					.expect(200)
					.end(function(colaboradorSaveErr, colaboradorSaveRes) {
						// Handle Colaborador save error
						if (colaboradorSaveErr) done(colaboradorSaveErr);

						// Get a list of Colaboradors
						agent.get('/colaboradors')
							.end(function(colaboradorsGetErr, colaboradorsGetRes) {
								// Handle Colaborador save error
								if (colaboradorsGetErr) done(colaboradorsGetErr);

								// Get Colaboradors list
								var colaboradors = colaboradorsGetRes.body;

								// Set assertions
								(colaboradors[0].user._id).should.equal(userId);
								(colaboradors[0].name).should.match('Colaborador Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Colaborador instance if not logged in', function(done) {
		agent.post('/colaboradors')
			.send(colaborador)
			.expect(401)
			.end(function(colaboradorSaveErr, colaboradorSaveRes) {
				// Call the assertion callback
				done(colaboradorSaveErr);
			});
	});

	it('should not be able to save Colaborador instance if no name is provided', function(done) {
		// Invalidate name field
		colaborador.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Colaborador
				agent.post('/colaboradors')
					.send(colaborador)
					.expect(400)
					.end(function(colaboradorSaveErr, colaboradorSaveRes) {
						// Set message assertion
						(colaboradorSaveRes.body.message).should.match('Please fill Colaborador name');
						
						// Handle Colaborador save error
						done(colaboradorSaveErr);
					});
			});
	});

	it('should be able to update Colaborador instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Colaborador
				agent.post('/colaboradors')
					.send(colaborador)
					.expect(200)
					.end(function(colaboradorSaveErr, colaboradorSaveRes) {
						// Handle Colaborador save error
						if (colaboradorSaveErr) done(colaboradorSaveErr);

						// Update Colaborador name
						colaborador.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Colaborador
						agent.put('/colaboradors/' + colaboradorSaveRes.body._id)
							.send(colaborador)
							.expect(200)
							.end(function(colaboradorUpdateErr, colaboradorUpdateRes) {
								// Handle Colaborador update error
								if (colaboradorUpdateErr) done(colaboradorUpdateErr);

								// Set assertions
								(colaboradorUpdateRes.body._id).should.equal(colaboradorSaveRes.body._id);
								(colaboradorUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Colaboradors if not signed in', function(done) {
		// Create new Colaborador model instance
		var colaboradorObj = new Colaborador(colaborador);

		// Save the Colaborador
		colaboradorObj.save(function() {
			// Request Colaboradors
			request(app).get('/colaboradors')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Colaborador if not signed in', function(done) {
		// Create new Colaborador model instance
		var colaboradorObj = new Colaborador(colaborador);

		// Save the Colaborador
		colaboradorObj.save(function() {
			request(app).get('/colaboradors/' + colaboradorObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', colaborador.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Colaborador instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Colaborador
				agent.post('/colaboradors')
					.send(colaborador)
					.expect(200)
					.end(function(colaboradorSaveErr, colaboradorSaveRes) {
						// Handle Colaborador save error
						if (colaboradorSaveErr) done(colaboradorSaveErr);

						// Delete existing Colaborador
						agent.delete('/colaboradors/' + colaboradorSaveRes.body._id)
							.send(colaborador)
							.expect(200)
							.end(function(colaboradorDeleteErr, colaboradorDeleteRes) {
								// Handle Colaborador error error
								if (colaboradorDeleteErr) done(colaboradorDeleteErr);

								// Set assertions
								(colaboradorDeleteRes.body._id).should.equal(colaboradorSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Colaborador instance if not signed in', function(done) {
		// Set Colaborador user 
		colaborador.user = user;

		// Create new Colaborador model instance
		var colaboradorObj = new Colaborador(colaborador);

		// Save the Colaborador
		colaboradorObj.save(function() {
			// Try deleting Colaborador
			request(app).delete('/colaboradors/' + colaboradorObj._id)
			.expect(401)
			.end(function(colaboradorDeleteErr, colaboradorDeleteRes) {
				// Set message assertion
				(colaboradorDeleteRes.body.message).should.match('User is not logged in');

				// Handle Colaborador error error
				done(colaboradorDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Colaborador.remove().exec();
		done();
	});
});