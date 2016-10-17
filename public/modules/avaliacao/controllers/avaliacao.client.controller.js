'use strict';

angular.module('avaliacao').controller('AvaliacaoController', ['$scope', '$stateParams', '$location', 'Authentication', 'Avaliacao', 'Divisaos','Colaboradors', 'Papels',
	function ($scope, $stateParams, $location, Authentication, Avaliacao, Divisaos, Colaboradors, Papels) {

		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		// Page changed handler
		$scope.pageChanged = function () {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Avaliação
		$scope.create = function () {
			// Create new Avaliação object
			var avaliacao = new Avaliacao({
				name: this.name,
				description: this.description,
				divisao: this.divisao,
				colaborador: this.colaborador,
				especialidade: this.especialidade,
				papel: this.papel,
				atributos: this.atributos
				
			});

			// Redirect after save
			avaliacao.$save(function (response) {
				$location.path('avaliacao/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.divisao = '';
				$scope.colaborador = '';
				$scope.especialidade = '';
				$scope.papel = '';
				$scope.atributos = '';

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Avaliacao
		$scope.remove = function (avaliacao) {
			if (avaliacao) {
				avaliacao.$remove(function (response) {
					$scope.success = response.message;
					console.log(response.message);
					//$location.path('avaliacao');
				});
				for (var i in $scope.avaliacao) {
					if ($scope.avaliacao[i] === avaliacao) {
						$scope.avaliacao.splice(i, 1);
					}
				}
			} else {
				$scope.avaliacao.$remove(function (response) {
					$scope.success = response.message;
					//$location.path('avaliacao');
				});
			}
		};

		// Update existing Avaliacao
		$scope.update = function () {
			var avaliacao = $scope.avaliacao;

			avaliacao.$update(function (response) {
				console.log(response);
				$location.path('avaliacao/' + response.identificador);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Avaliacao
		$scope.find = function () {
			$scope.avaliacao = Avaliacao.query();
		};

		// Find a list of Division
		$scope.findDivisao = function () {
			$scope.divisoes = Divisaos.query();
		};

		// Find a list of Papers
		$scope.findPapeis = function () {
			$scope.papeis = Papels.query();
			if(!$scope.papeis){
				$scope.papeis = 'Nenhum registro encontrado';
			}
		};

		// Find a list of Colaboradores
		$scope.findColaboradores = function () {
			console.log('Lista colaboradores: ', Colaboradors.query());
			$scope.colaboradores = Colaboradors.query();
		};

		// Find existing Avaliação
		$scope.findOne = function () {
			$scope.avaliacao = Avaliacao.get({
				avaliacaoId: $stateParams.avaliacaoId
			});
		};

		// Search for a Avaliação
		$scope.categorySearch = function (product) {
			$location.path('avaliacao/' + product._id);
		};



	}
]);