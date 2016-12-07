(function(){
	'use strict';

	angular.module('AppBlueBank')
		   
	   .constant('CONFIG', {
	   		WsURL : '/',	   		
	   		culture : 'pt-br'
	   })
	   
	   .constant('ERROR_MESSAGES', {
	   		'pt-br' : {
		   		 0 : 'App ID deve ser preenchido',
				 1 : 'Device ID deve ser preenchido',
				 2 : 'Push Title deve ser preenchido',
				 3 : 'Message deve ser preenchido',
				 4 : 'Nome deve ser preenchido',
				 5 : 'E-mail deve ser preenchido',
				 6 : 'Password deve ser preenchido',
				 7 : 'E-mail exists',
				 8 : 'App not found',
				 9 : 'AppId deve ser preenchido',
				10 : 'Device Token deve ser preenchido',
				11 : 'Platform deve ser preenchido',
				11 : 'Platform must be integer (1 to Android and 2 to iOS)',
				12 : 'Device not found',
				13 : 'Devices deve ser preenchido',
				14 : 'Devices must be array of objects: { "token" : "string_token", "platform" : number }, where plataform is 1 for iOS and 2 for Android',
				15 : 'Tenant Id deve ser preenchido',
				16 : 'Tenant Id já existe',
				17 : 'Type deve ser preenchido',
				18 : 'Type must be a number: 1 for sandbox and 2 for production',
				19 : 'Password deve ser preenchido',
				20 : 'Certificate deve ser preenchido',
				21 : 'Certificate certificado deve ser P12',
				22 : 'Data de expiração deve ser preenchida',
				23 : 'E-mail e senha incorretos'
			}
	   })

	   .constant('moment', moment)

	;

})()