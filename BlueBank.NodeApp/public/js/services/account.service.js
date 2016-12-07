(function(){
	'use strict';

	angular.module('AppBlueBank')
		   .service('AccountService', AccountService);

	AccountService.$inject = [
		'CONFIG',
		'$q',
		'$http'
	];

	function AccountService(
		CONFIG,
		$q,
		$http
	){

		var _url = CONFIG.WsURL + 'account/';
			
		return {
			account : {
				agency : '',
				account : '',
				balance : 0
			},
			checkAccount : checkAccount
		};

		function checkAccount(agency, account){

			var deferred = $q.defer();
			
			$http.post(
				_url + 'checkAccount',
				{
					agency : agency,
					account : account
				}
			).success(function(data){

				if (data.success) {
					deferred.resolve(data.result);
				} else {
					deferred.reject(data.errors);
				}

			}).error(function(data){
				deferred.reject(data.errors);
			});
			
			return deferred.promise;

		}

	}

})();