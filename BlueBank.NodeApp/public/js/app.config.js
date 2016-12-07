(function(){
	'use strict';

	angular.module('AppBlueBank').config(Config);

	Config.$inject = [
		'$urlRouterProvider',
		'$stateProvider'
	];
	
	function Config(
		$urlRouterProvider,
		$stateProvider
	){
		console.log('## CONFIG');

		$urlRouterProvider.otherwise("/transfer");

		$stateProvider

		    .state('transfer', {
				url : '/transfer',
				controller : 'TransferController',
				controllerAs : 'vm',
				templateUrl : '/views/transfer.view.html'
			})
		;
	}

})();