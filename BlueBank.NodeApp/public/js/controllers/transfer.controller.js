(function(){
	'use strict';

	angular.module('AppBlueBank')
		   .controller('TransferController', TransferController);

	TransferController.$inject = [ 
		'$log',
		'$mdDialog',
		'AccountService',
		'TransferService'
	];

	function TransferController(
		$log,
		$mdDialog,
		AccountService,
		TransferService	
	){

		$log.log('TransferController...');

		var vm = this;

		vm.formData = {};
		vm.loading = false;

		vm.onClickTransfer = onClickTransfer;
		vm.onExitAccount = onExitAccount;
		vm.onExitAgency = onExitAgency;

		//Initialize
		function onLoad(){

			vm.formData = {
				source: {
					agency: '',	
					account: '',	
					balance: '0.00'
				},
				destination: {
					agency: '',	
					account: '',	
					balance: '0.00'
				},
				transfer: 0
			};
		}

		function init(){
			
			onLoad();

		}

		//Methods of template
		function onClickTransfer(formData){

			var isValid = function(){

				var errors = [];

				//Source 
				if (angular.isUndefined(formData.source.agency) || formData.source.agency === '')
					errors.push('Número da Agência de origem deve ser preenchido');

				else if (formData.source.agency.toString().length != 4)
					errors.push('Número da Agência de origem com tamanho inválido');
				
				else if (angular.isUndefined(formData.source.account) || formData.source.account === '')
					errors.push('Número da Conta de origem deve ser preenchido');

				else if (formData.source.account.toString().length != 7)
					errors.push('Número da Conta de origem com tamanho inválido');

				else if (formData.source.balance == 0)
					errors.push('Esta conta de origem não possui saldo suficiente para realizar transferências');

				//Destination
				else if (angular.isUndefined(formData.destination.agency) || formData.destination.agency === '')
					errors.push('Número da Agência de destino deve ser preenchido');

				else if (formData.destination.agency.toString().length != 4)
					errors.push('Número da Agência de destino com tamanho inválido');
				
				else if (angular.isUndefined(formData.destination.account) || formData.destination.account === '')
					errors.push('Número da Conta de destino deve ser preenchido');

				else if (formData.destination.account.toString().length != 7)
					errors.push('Número da Conta de destino com tamanho inválido');

				else if (angular.isUndefined(formData.transfer) || formData.transfer === '')
					errors.push('Valor a transferir deve ser preenchido');

				else if (formData.transfer <= 0)
					errors.push('Valor a transferir deve ser maior que zero');

				else if (formData.transfer > formData.source.balance)
					errors.push('Valor a transferir deve ser menor ou igual ao saldo disponível na conta de origem');

				return errors;
			};

			var doTransfer = function() {

				// LOCAL STORAGE END POINT IS SETTED
				TransferService.postTransfer(formData).then(function(data){

					$mdDialog.show(
				    	$mdDialog.alert()
				        	.clickOutsideToClose(true)
				        	.title('Blue Bank')
				        	.textContent('Transferência realizada com sucesso!')
				        	.ok('Ok')
				    );

				}, function(err){

					$mdDialog.show(
				    	$mdDialog.alert()
				        	.clickOutsideToClose(true)
				        	.title('Blue Bank')
				        	.textContent('Ocorreu um erro ao efetuar a operação')
				        	.ok('Ok')
				    );

				});
			};

			var errors = isValid();
			if (errors.length === 0){

				//OK
				doTransfer();

			} else {

				var html = '';
				var len = errors.length;

				for (var i = 0; i < len; i++){
					if (html !== '') html += '<br>';
					html += errors[i];
				}

				$mdDialog.show(
			    	$mdDialog.alert()
			        	.clickOutsideToClose(true)
			        	.title('Blue Bank')
			        	.textContent(html)
			        	.ok('Ok')
			    );

			}

		}

		function onExitAccount(data, isSource){

			if (data.agency.toString().length == 4 && data.account.toString().length == 7) {

				vm.loading = true;
				AccountService.checkAccount(data.agency, data.account).then(function(data){
		
					vm.loading = false;
					
					if (isSource) {
						vm.formData.source.balance = data.balance;
					} else {	
						vm.formData.destination.balance = data.balance;
					}

				}, function(err){

					vm.loading = false;
					$mdDialog.show(
				    	$mdDialog.alert()
				        	.clickOutsideToClose(true)
				        	.title('Blue Bank')
				        	.textContent('Conta ' + (isSource ? 'origem' : 'destino') + ' não encontrada')
				        	.ok('Ok')
				    );

				});

			} else {

				if (isSource) {
					vm.formData.source.balance = '0.00';
				} else {
					vm.formData.destination.balance = '0.00';
				}
				
			}

		}

		function onExitAgency(data, isSource){
		
			if (data.agency.toString().length != 4){

				if (isSource) {
					vm.formData.source.account = '';
					vm.formData.source.balance = '0.00';
				} else {
					vm.formData.destination.account = '';
					vm.formData.destination.balance = '0.00';
				}

			}

		}

		init();

	}

})();