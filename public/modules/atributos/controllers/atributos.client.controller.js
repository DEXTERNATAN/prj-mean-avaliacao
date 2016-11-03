'use strict';

// Atributos controller
angular.module('atributos').controller('AtributosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Atributos',
	function ($scope, $stateParams, $location, Authentication, Atributos) {

		$scope.authentication = Authentication;
		$scope.atributo = {};

		$scope.classificacao = {
			abrangencia: {
				moderado: null,
				significativo: null,
				muito: null
			},
			complexidade: {
				moderada: null,
				alta: null,
				altissima: null
			},
			impacto: {
				relevancia: null,
				muito: null,
				altamente: null
			}
		};

		// Create new Atributo
		$scope.create = function () {

			console.log('Entrei', $scope.classificacao);

			// Create new Atributo object
			var atributo = new Atributos({
				name: this.name,
				tipo: ['Abrangência', 'Impacto', 'Relevância'],
				classificacao: [$scope.classificacao],
				checado: true
			});
			
			//Redirect after save
			atributo.$save(function (response) {
				$location.path('atributos/' + response._id);

				// 	// Clear form fields
				$scope.name = '';
				$scope.tipo = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		// Remove existing Atributo
		$scope.remove = function (atributo) {
			if (atributo) {
				atributo.$remove();

				for (var i in $scope.atributos) {
					if ($scope.atributos[i] === atributo) {
						$scope.atributos.splice(i, 1);
					}
				}
			} else {
				$scope.atributo.$remove(function () {
					$location.path('atributos');
				});
			}
		};

		// Update existing Atributo
		$scope.update = function () {
			var atributo = $scope.atributo;

			atributo.$update(function () {
				$location.path('atributos/' + atributo._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Atributos
		$scope.find = function () {
			$scope.atributos = Atributos.query();
		};

		// Find existing Atributo
		$scope.findOne = function () {
			$scope.atributo = Atributos.get({
				atributoId: $stateParams.atributoId
			});
		};

	}
]);