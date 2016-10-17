'use strict';

(function() {
	// Divisaos Controller Spec
	describe('Divisaos Controller Tests', function() {
		// Initialize global variables
		var DivisaosController,
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

			// Initialize the Divisaos controller.
			DivisaosController = $controller('DivisaosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Divisao object fetched from XHR', inject(function(Divisaos) {
			// Create sample Divisao using the Divisaos service
			var sampleDivisao = new Divisaos({
				name: 'New Divisao'
			});

			// Create a sample Divisaos array that includes the new Divisao
			var sampleDivisaos = [sampleDivisao];

			// Set GET response
			$httpBackend.expectGET('divisaos').respond(sampleDivisaos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.divisaos).toEqualData(sampleDivisaos);
		}));

		it('$scope.findOne() should create an array with one Divisao object fetched from XHR using a divisaoId URL parameter', inject(function(Divisaos) {
			// Define a sample Divisao object
			var sampleDivisao = new Divisaos({
				name: 'New Divisao'
			});

			// Set the URL parameter
			$stateParams.divisaoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/divisaos\/([0-9a-fA-F]{24})$/).respond(sampleDivisao);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.divisao).toEqualData(sampleDivisao);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Divisaos) {
			// Create a sample Divisao object
			var sampleDivisaoPostData = new Divisaos({
				name: 'New Divisao'
			});

			// Create a sample Divisao response
			var sampleDivisaoResponse = new Divisaos({
				_id: '525cf20451979dea2c000001',
				name: 'New Divisao'
			});

			// Fixture mock form input values
			scope.name = 'New Divisao';

			// Set POST response
			$httpBackend.expectPOST('divisaos', sampleDivisaoPostData).respond(sampleDivisaoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Divisao was created
			expect($location.path()).toBe('/divisaos/' + sampleDivisaoResponse._id);
		}));

		it('$scope.update() should update a valid Divisao', inject(function(Divisaos) {
			// Define a sample Divisao put data
			var sampleDivisaoPutData = new Divisaos({
				_id: '525cf20451979dea2c000001',
				name: 'New Divisao'
			});

			// Mock Divisao in scope
			scope.divisao = sampleDivisaoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/divisaos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/divisaos/' + sampleDivisaoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid divisaoId and remove the Divisao from the scope', inject(function(Divisaos) {
			// Create new Divisao object
			var sampleDivisao = new Divisaos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Divisaos array and include the Divisao
			scope.divisaos = [sampleDivisao];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/divisaos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDivisao);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.divisaos.length).toBe(0);
		}));
	});
}());