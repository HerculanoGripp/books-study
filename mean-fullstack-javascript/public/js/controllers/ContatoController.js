// public/js/controllers/ContatoController.js

angular.module('contatooh').controller('ContatoController',
	function($scope, $routeParams, Contato){

		$scope.salva = function(){
			$scope.contato.$save()
				.then(function() {
					$scope.mensagem = {texto: "Contato salvo com sucesso"}

					// Limpa o formulário
					$scope.contato = new Contato();
				})

				.catch(function(erro) {
					$scope.mensagem = {texto: "Não possível salvar o contato"}
				});
		};

		if($routeParams.contatoId){

			Contato.get({id: $routeParams.contatoId},
				function(contato){
					$scope.contato = contato;
				},
				function(erro){
					$scope.mensagem = {
						texto: "Não foi possível obter o contato"
					};
					console.log(erro);
				}
			);

		}else{
			$scope.contato = new Contato();
		}

		Contato.query(function(contatos){
			$scope.contatos = contatos;
		});
	});