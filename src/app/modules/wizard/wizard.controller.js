(function () {
    'use strict';

    angular
        .module('wizard')
        .controller('WizardController', Controller)
   

    /* @ngInject */

    function Controller($window, $scope, $filter, $rootScope, $timeout, $interval, $q, $http, $compile, Clique, WizardModel, $mdDialog, $mdToast, $state)
     {

        // var appConfig = Clique.configApp();
        // $scope.appName = appConfig.appName;
        // $scope.appLogo = appConfig.appLogo;
        //  var userInfo  = Clique.getUserInfo();
        // console.log('username' ,userInfo)
      
        var vm = this;
        vm.openErpConnectDialog = openErpConnectDialog;
        vm.verficationaccounts      = verficationaccounts;
        vm.VerifyAccountreceivable = VerifyAccountreceivable;
        vm.cloverdisconnect = cloverdisconnect;
      //   vm.verifysettingdefaultcustomer = verifysettingdefaultcustomer;
        vm.cloveropen = false;
        vm.status = true;
        $scope.showPaymentLink = false;
        vm.isInvoiceLoaded = true;
        vm.ispageloaded = true;
        vm.selectedTimezone = null;
        vm.searchTimezone = null;
        vm.statusAccreceivable = false;
        vm.statusclearingaccount = false;
        vm.statuscustomersetting = false;
        vm.timezonequery = timezonequery;
        vm.itemSelected = itemSelected;
        vm.sheduletimezone = sheduletimezone;
        vm.simulateQuery = true;
        vm.redirectapp = redirectapp;
        vm.submit = submit;
        vm.forscheduler = forscheduler;
       
        vm.timezone = [
          { category: 'United States', name: 'AST' },
          { category: 'United States', name: 'EST' },
          { category: 'United States', name: 'CST' },
        //   { category: 'United States', name: 'MST (UTC-7) Denver' },
        //   { category: 'United States', name: 'MST (UTC-7) Phoenix' },
        //   { category: 'United States', name: 'PST (UTC-8) Los Angeles' },
        //   { category: 'United States', name: 'AKST (UTC-9) Anchorage' },
        //   { category: 'United States', name: 'HST (UTC-10) Honolulu' }
         
        ];
        var scheduletime = {};
        // var scheduled_at;
        // var timezone;
        vm.datetime = [
            // { category: 'AM', time: '00:00' },
            // { category: 'AM', time: '01:00' },
            // { category: 'AM', time: '02:00' },
            // { category: 'AM', time: '03:00' },
            // { category: 'AM', time: '04:00' },
            // { category: 'AM', time: '05:00' },
            // { category: 'AM', time: '06:00' },
            // { category: 'AM', time: '07:00' },
            // { category: 'AM', time: '08:00' },
            // { category: 'AM', time: '09:00' },
            // { category: 'AM', time: '10:00' },
            // { category: 'AM', time: '11:00' },
            // { category: 'PM', time: '12:00' },
            // { category: 'PM', time: '01:00' },
            // { category: 'PM', time: '02:00' },
            // { category: 'PM', time: '03:00' },
            // { category: 'PM', time: '04:00' },
            // { category: 'PM', time: '05:00' },
            // { category: 'PM', time: '06:00' },
            // { category: 'PM', time: '07:00' },
            // { category: 'PM', time: '08:00' },
            // { category: 'PM', time: '09:00' },
            // { category: 'PM', time: '10:00' },
            // { category: 'PM', time: '11:00' }
            { category: 'AM', time: '00:00:00 AM' },
            { category: 'AM', time: '01:00:00 AM' },
            { category: 'AM', time: '02:00:00 AM' },
            { category: 'AM', time: '03:00:00 AM' },
            { category: 'AM', time: '04:00:00 AM' },
            { category: 'AM', time: '05:00:00 AM' },
            { category: 'AM', time: '06:00:00 AM' },
            { category: 'AM', time: '07:00:00 AM' },
            { category: 'AM', time: '08:00:00 AM' },
            { category: 'AM', time: '09:00:00 AM' },
            { category: 'AM', time: '10:00:00 AM' },
            { category: 'AM', time: '11:00:00 AM' },
            { category: 'PM', time: '12:00:00 PM' },
            { category: 'PM', time: '01:00:00 PM' },
            { category: 'PM', time: '02:00:00 PM' },
            { category: 'PM', time: '03:00:00 PM' },
            { category: 'PM', time: '04:00:00 PM' },
            { category: 'PM', time: '05:00:00 PM' },
            { category: 'PM', time: '06:00:00 PM' },
            { category: 'PM', time: '07:00:00 PM' },
            { category: 'PM', time: '08:00:00 PM' },
            { category: 'PM', time: '09:00:00 PM' },
            { category: 'PM', time: '10:00:00 PM' },
            { category: 'PM', time: '11:00:00 PM' }
         
        ]


        function itemSelected(value) {
             
          
             if(  value == undefined )
             {
                 // vm.selectedTimezone = value.name;
             }
             else if(value.name)
             {
                 vm.selectedTimezone = value.name;
             }
             else{
                  vm.selectedTimezone = value;
             }
   
       }
      function sheduletimezone(value){
    
    vm.datetimecustomer = value;
    //  vm.categorytime = value.category;
    //  var today = $filter('vm.time')(new Date(),'HH:mm:ss Z');
      }




      
      function redirectapp(){
          
          var windowlocation = window.location; 

          
          var windowredirect = windowlocation.origin+"/apps/cloversync/"; 

          console.log("var windowredirect",windowredirect);
          window.location.href = windowredirect;
  
      }
        $scope.cloverconnect = function() {

            $scope.promise = WizardModel.Statusconnect();
            $scope.promise.then(function (response) {
            
                if (response.statuscode == 0) {
                   debugger;
                    vm.activeclover = response.data.is_connected;
                    vm.VerifyAccountreceivable();
                    vm.verficationaccounts();
                   $scope.verifysettingdefaultcustomer();
                    vm.isInvoiceLoaded = false;

if(vm.activeclover == true){
vm.forscheduler();
}
else {

}

                } else {}
            });
        }

         $scope.cloverconnect();



function forscheduler(){
    $scope.promise = WizardModel.Scheduler();
    $scope.promise.then(function (response) { 
        if (response.statuscode == 0) {
            debugger;
            vm.selectedTimezone  =  response.data.items[0].timezone;  
            vm.datetimecustomer  =  response.data.items[0].schedule_at;   
      
      
        }
    
    });
}


        function timezonequery(query) {
           
            var results = query ? vm.timezone.filter(createFilterFor(query)) : vm.timezone,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function createFilterFor(query) {
         
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(timezone) {

                var DisplayName = angular.lowercase(timezone.name).toString();
                return ((DisplayName).indexOf(lowercaseQuery) === 0);
            };
        }


        function VerifyAccountreceivable() {
            if(vm.activeclover == true) {
               
            $scope.promise = WizardModel.Accountreceivable();
            $scope.promise.then(function (response) {
           debugger;
                if (response.statuscode == 0) {
                
                    vm.Accreceivable = response.data;
                    vm.statusAccreceivable = true;
                    vm.isInvoiceLoaded = false;
                    vm.ispageloaded = false;
                } else {}
            });
        }
    }
         
      
            function verficationaccounts() {
if(vm.activeclover == true) {

            $scope.promise = WizardModel.clearingaccount();
            $scope.promise.then(function (response) {
             
                if (response.statuscode == 0) {
                    
                    vm.accclearing = response.data;
                    vm.statusclearingaccount = true;
                    
                } else {}
            });
        } 
    }
    
    $scope.verifysettingdefaultcustomer = function() {
        debugger;
        if(vm.activeclover == true) {
       
                    $scope.promise = WizardModel.statuscustomer();
                    $scope.promise.then(function (response) {
                     debugger;
                        if (response.statuscode == 0) {
                            
                            vm.customersetting = response.data;
                            vm.statuscustomersetting = true;
                            vm.ispageloaded = false;
                        } else {}
                    });
                } 
            }    

        

    


        function cloverdisconnect() {

            $scope.promise = WizardModel.Statusdisconnect();
            $scope.promise.then(function (response) {
              
                if (response.statuscode == 0) {

                   
                    vm.activeclover = false;
                } else {}
            });
            vm.activeclover = false;
        }
       





         function openErpConnectDialog() {
          
          vm.cloveropen = true;
          $window.open('https://sandbox.dev.clover.com/oauth/authorize?client_id=KA2VAY1T9JPR4', 
          'C-Sharpcorner', 
         'toolbar=no,scrollbars=no,resizable=no,top=130,left=400,width=700,height=500');
         // vm.openErpConnectDialog();
         
   }


function submit() {
    debugger;
    var scheduletime = {
        scheduled_at: vm.datetimecustomer ,
         timezone: vm.selectedTimezone 
       };
       
   $scope.promise = WizardModel.Schedulertimezone(scheduletime);
   
   $scope.promise.then(function (response) {
       debugger;
       
    Clique.showToast(response.statusmessage, 'bottom right', 'success');

     vm.clover = true;
    localStorage.setItem("cloverstatus", vm.clover);
    vm.redirectapp();
});
}
        // $scope.cancel = function () {
        //     $mdDialog.cancel();
        // };




    }
})();
