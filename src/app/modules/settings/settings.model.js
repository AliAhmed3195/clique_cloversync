(function () {
    'use strict';

    angular
    .module('settings')
    .factory('SettingModel', SettingModel);

    SettingModel.$inject = ['$http','Clique','API_CONFIG'];
    function SettingModel($http,Clique,API_CONFIG) {
        var service = {};

      
        // service.GetErpStatus = GetErpStatus;
        service.GetAccounts = GetAccounts;
        service.clearingaccount = clearingaccount;
        service.statuscustomer = statuscustomer;
        service.Statusclover = Statusclover;
        service.Statusconnect = Statusconnect;
        service.Statusdisconnect = Statusdisconnect;
        service.Schedulertimezone = Schedulertimezone;
        service.Syncjob = Syncjob;
        service.PostSchedulertimezone = PostSchedulertimezone;
        service.SaveInvoiceContactSettings = SaveInvoiceContactSettings;
        service.Poststatus = Poststatus;
        service.PostSyncDate = PostSyncDate;
        return service;
        
        function GetAccounts() {
           
            return Clique.callService('get','/erp/quickbooks/account','').then(handleSuccess, handleError);
        }
        function clearingaccount() {
         
            return Clique.callService('get','/settings/','').then(handleSuccess, handleError);
        }
        function statuscustomer() {
            return Clique.callService('POST','/erp/quickbooks/contact/','').then(handleSuccess, handleError);
        }

        function PostSyncDate(params) {
           
            return Clique.callService('post','/clover/sync/order/bydate/',params).then(handleSuccess, handleError);
        }

        function Statusconnect() {
           
            return Clique.callService('get','/clover/connection/status','').then(handleSuccess, handleError);
        }
        
        function Statusclover() {
           
            return Clique.callService('get','/clover/connection/status','').then(handleSuccess, handleError);
        }
         function Statusdisconnect() {
          
            return Clique.callService('get','/clover/disconnected/','').then(handleSuccess, handleError);
        }

        function Schedulertimezone() {
          
            return Clique.callService('get','/clover/scheduler/','').then(handleSuccess, handleError);
        }
       
        function Poststatus(params) {
       
            return Clique.callService('post','/clover/activate',params).then(handleSuccess, handleError);
           
        }
        function PostSchedulertimezone(params) {
         
             return Clique.callService('post','/clover/scheduler/create/',params).then(handleSuccess, handleError);
            
         }

        function Syncjob() {
      
            return Clique.callService('get' ,'/clover/dojob','').then(handleSuccess, handleError);
        }
        function SaveInvoiceContactSettings(params) {
            //return Clique.callService('post','/settings/invoice_contact',params).then(handleSuccess, handleError);
            return Clique.callService('post','/settings/',params).then(handleSuccess, handleError);
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
