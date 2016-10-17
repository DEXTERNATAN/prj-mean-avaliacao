'use strict';

(function() {
	// Papels Controller Spec
	describe('Papels Controller Tests', function() {
		// Initialize global variables
		var PapelsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Papels controller.
			PapelsController = $controller('PapelsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Papel object fetched from XHR', inject(function(Papels) {
			// Create sample Papel using the Papels service
			var samplePapel = new Papels({
				name: 'New Papel'
			});

			// Create a sample Papels array that includes the new Papel
			var samplePapels = [samplePapel];

			// Set GET response
			$httpBackend.expectGET('papels').respond(samplePapels);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.papels).toEqualData(samplePapels);
		}));

		it('$scope.findOne() should create an array with one Papel object fetched from XHR using a papelId URL parameter', inject(function(Papels) {
			// Define a sample Papel object
			var samplePapel = new Papels({
				name: 'New Papel'
			});

			// Set the URL parameter
			$stateParams.papelId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/papels\/([0-9a-fA-F]{24})$/).respond(samplePapel);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.papel).toEqualData(samplePapel);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Papels) {
			// Create a sample Papel object
			var samplePapelPostData = new Papels({
				name: 'New Papel'
			});

			// Create a sample Papel response
			var samplePapelResponse = new Papels({
				_id: '525cf20451979dea2c000001',
				name: 'New Papel'
			});

			// Fixture mock form input values
			scope.name = 'New Papel';

			// Set POST response
			$httpBackend.expectPOST('papels', samplePapelPostData).respond(samplePapelResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Papel was created
			expect($location.path()).toBe('/papels/' + samplePapelResponse._id);
		}));

		it('$scope.update() should update a valid Papel', inject(function(Papels) {
			// Define a sample Papel put data
			var samplePapelPutData = new Papels({
				_id: '525cf20451979dea2c000001',
				name: 'New Papel'
			});

			// Mock Papel in scope
			scope.papel = samplePapelPutData;

			// Set PUT response
			$httpBackend.expectPUT(/papels\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/papels/' + samplePapelPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid papelId and remove the Papel from the scope', inject(function(Papels) {
			// Create new Papel object
			var samplePapel = new Papels({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Papels array and include the Papel
			scope.papels = [samplePapel];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/papels\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePapel);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.papels.length).toBe(0);
		}));
	});
}());