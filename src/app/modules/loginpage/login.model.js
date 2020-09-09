(function () {
    'use strict';

    angular
    .module('login')
    .factory('LoginModel', LoginModel);

    LoginModel.$inject = ['$http','Clique','$httpParamSerializer'];
    function LoginModel($http,Clique, $httpParamSerializer) {
        var service = {};

      
         service.GetCloverloginStatus = GetCloverloginStatus;
        
        return service;
      
      
        function GetCloverloginStatus() {
            return Clique.callService('get','/clover/connection/status','').then(handleSuccess, handleError);
        }
  
    
      
        // private functions

        function handleSuccess(res) {
            //console.log('----handle Success---');
            //console.log(res);
            return res.data;
        }

        function handleError(error) {
            //console.log(error);
            //console.log('----handle Error---');
            return error;
        }
    }

})();
