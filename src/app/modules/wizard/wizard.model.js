(function () {
    'use strict';

    angular
    .module('wizard')
    .factory('WizardModel', WizardModel);

    WizardModel.$inject = ['$http','Clique','API_CONFIG'];
    function WizardModel($http,Clique,API_CONFIG) {
        var service = {};

      
        // service.GetErpStatus = GetErpStatus;
        service.Accountreceivable = Accountreceivable;
        service.clearingaccount = clearingaccount;
        service.statuscustomer = statuscustomer;
        service.Statusconnect = Statusconnect;
        service.Statusdisconnect = Statusdisconnect;
        service.Schedulertimezone = Schedulertimezone;
        service.Scheduler = Scheduler;
        return service;
        
        function Accountreceivable() {
            
            return Clique.callService('get','/erp/quickbooks/account','').then(handleSuccess, handleError);
        }
        function clearingaccount() {
            
            return Clique.callService('get','/settings/','').then(handleSuccess, handleError);
        }
        function statuscustomer() {
           
            return Clique.callService('post','/clover/customer/default/','').then(handleSuccess, handleError);
        }

       
        
        function Statusconnect() {
           
            return Clique.callService('get','/clover/connection/status','').then(handleSuccess, handleError);
        }
        function Statusdisconnect() {
        
            return Clique.callService('get','/clover/disconnected/','').then(handleSuccess, handleError);
        }
       
        function Schedulertimezone(params) {
          
            return Clique.callService('post','/clover/scheduler/create/',params).then(handleSuccess, handleError);
           
        }
        function Scheduler() {
          
            return Clique.callService('get','/clover/scheduler/','').then(handleSuccess, handleError);
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
