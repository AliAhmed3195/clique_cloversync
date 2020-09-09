(function () {
    'use strict';

    angular
    .module('transaction')
    .factory('OrderModel', OrderModel);

    OrderModel.$inject = ['$http','Clique','$httpParamSerializer'];
    function OrderModel($http,Clique, $httpParamSerializer) {
        var service = {};

      
        // service.GetErpStatus = GetErpStatus;
        service.GetTransactionHistory = GetTransactionHistory;
        service.GetOrderRetry = GetOrderRetry;
        return service;
      
      
        // function GetErpStatus() {
        //     return Clique.callService('get','/erp/status','').then(handleSuccess, handleError);
        // }
  
        function GetTransactionHistory(query) {
        
            var qs = $httpParamSerializer(query);
            return Clique.callService('get','/clover/history/?' + qs,'').then(handleSuccess, handleError);
        }
        v1/clover/retry

        function GetOrderRetry(params) {
       debugger;
            return Clique.callService('post','/clover/retry/', params).then(handleSuccess, handleError);
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
