(function(){
	'use strict';

	angular.module('AppBlueBank')
		   .service('TransferService', TransferService);

	TransferService.$inject = [		
		'CONFIG',
		'$q',
		'$http'
	];
	function TransferService(
		CONFIG,
		$q,
		$http
	){

		var _url = CONFIG.WsURL + 'transfer';

		return {
			transfer : {
				source : {
					agency : '',
					account : '',
					balance: '0.00'
				},
				destination : {
					agency : '',
					account : '',
					balance: '0.00'
				},
				transfer : 0
			},
			postTransfer : postTransfer
		};

		function postTransfer(_data){

			var deferred = $q.defer();

			var data = angular.copy(this.transfer);
			angular.extend(data, _data);

			$http.post(_url, data).success(function(data){

				if (data.success){
					deferred.resolve(data.result);
				} else {
					deferred.reject(data.errors);
				}

			}).error(function(err){
				deferred.reject([err]);
			});

			return deferred.promise;

		}

	}

})();