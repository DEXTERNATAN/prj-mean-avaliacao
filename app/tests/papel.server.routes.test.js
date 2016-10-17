'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Papel = mongoose.model('Papel'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, papel;

/**
 * Papel routes tests
 */
describe('Papel CRUD tests', function() {
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

		// Save a user to the test db and create new Papel
		user.save(function() {
			papel = {
				name: 'Papel Name'
			};

			done();
		});
	});

	it('should be able to save Papel instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papel
				agent.post('/papels')
					.send(papel)
					.expect(200)
					.end(function(papelSaveErr, papelSaveRes) {
						// Handle Papel save error
						if (papelSaveErr) done(papelSaveErr);

						// Get a list of Papels
						agent.get('/papels')
							.end(function(papelsGetErr, papelsGetRes) {
								// Handle Papel save error
								if (papelsGetErr) done(papelsGetErr);

								// Get Papels list
								var papels = papelsGetRes.body;

								// Set assertions
								(papels[0].user._id).should.equal(userId);
								(papels[0].name).should.match('Papel Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Papel instance if not logged in', function(done) {
		agent.post('/papels')
			.send(papel)
			.expect(401)
			.end(function(papelSaveErr, papelSaveRes) {
				// Call the assertion callback
				done(papelSaveErr);
			});
	});

	it('should not be able to save Papel instance if no name is provided', function(done) {
		// Invalidate name field
		papel.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papel
				agent.post('/papels')
					.send(papel)
					.expect(400)
					.end(function(papelSaveErr, papelSaveRes) {
						// Set message assertion
						(papelSaveRes.body.message).should.match('Please fill Papel name');
						
						// Handle Papel save error
						done(papelSaveErr);
					});
			});
	});

	it('should be able to update Papel instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papel
				agent.post('/papels')
					.send(papel)
					.expect(200)
					.end(function(papelSaveErr, papelSaveRes) {
						// Handle Papel save error
						if (papelSaveErr) done(papelSaveErr);

						// Update Papel name
						papel.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Papel
						agent.put('/papels/' + papelSaveRes.body._id)
							.send(papel)
							.expect(200)
							.end(function(papelUpdateErr, papelUpdateRes) {
								// Handle Papel update error
								if (papelUpdateErr) done(papelUpdateErr);

								// Set assertions
								(papelUpdateRes.body._id).should.equal(papelSaveRes.body._id);
								(papelUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Papels if not signed in', function(done) {
		// Create new Papel model instance
		var papelObj = new Papel(papel);

		// Save the Papel
		papelObj.save(function() {
			// Request Papels
			request(app).get('/papels')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Papel if not signed in', function(done) {
		// Create new Papel model instance
		var papelObj = new Papel(papel);

		// Save the Papel
		papelObj.save(function() {
			request(app).get('/papels/' + papelObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', papel.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Papel instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Papel
				agent.post('/papels')
					.send(papel)
					.expect(200)
					.end(function(papelSaveErr, papelSaveRes) {
						// Handle Papel save error
						if (papelSaveErr) done(papelSaveErr);

						// Delete existing Papel
						agent.delete('/papels/' + papelSaveRes.body._id)
							.send(papel)
							.expect(200)
							.end(function(papelDeleteErr, papelDeleteRes) {
								// Handle Papel error error
								if (papelDeleteErr) done(papelDeleteErr);

								// Set assertions
								(papelDeleteRes.body._id).should.equal(papelSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Papel instance if not signed in', function(done) {
		// Set Papel user 
		papel.user = user;

		// Create new Papel model instance
		var papelObj = new Papel(papel);

		// Save the Papel
		papelObj.save(function() {
			// Try deleting Papel
			request(app).delete('/papels/' + papelObj._id)
			.expect(401)
			.end(function(papelDeleteErr, papelDeleteRes) {
				// Set message assertion
				(papelDeleteRes.body.message).should.match('User is not logged in');

				// Handle Papel error error
				done(papelDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Papel.remove().exec();
		done();
	});
});