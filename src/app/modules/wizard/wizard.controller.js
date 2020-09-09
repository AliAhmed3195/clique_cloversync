(function () {
    'use strict';

    angular
        .module('wizard')
        .controller('WizardController', Controller)
   

    /* @ngInject */

    function Controller($window, $scope, $filter, $rootScope, $timeout, $interval, $q, $http, $compile, Clique, WizardModel, $mdDialog, $mdToast, $state)
     {

        var vm = this;
        vm.openErpConnectDialog = openErpConnectDialog;
       
        vm.GetAccounts = GetAccounts;
        vm.cloverdisconnect = cloverdisconnect;
     
        vm.cloveropen = false;
        vm.status = true;
        $scope.showPaymentLink = false;
        vm.isInvoiceLoaded = true;
        vm.ispageloaded = true;
        vm.selectedTimezone = null;
        vm.searchTimezone = null;
        vm.timezonequery = timezonequery;
        vm.itemSelected = itemSelected;
        vm.sheduletimezone = sheduletimezone;
        vm.simulateQuery = true;
        vm.redirectapp = redirectapp;
        vm.submit = submit;
        vm.forscheduler = forscheduler;
        $scope.account_income = [];
        $scope.account_expense = [];
        $scope.account_asset = [];
        vm.timezone = [
          { category: 'United States', name: 'AST' },
          { category: 'United States', name: 'EST' },
          { category: 'United States', name: 'CST' },
          { category: 'United States', name: 'EDT' }
         
        ];
      
        vm.datetime = [
         
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
                   
                    vm.activeclover = response.data.is_connected;
                    vm.GetAccounts();
                    // vm.verficationaccounts();
                //    $scope.verifysettingdefaultcustomer();
                    vm.isInvoiceLoaded = false;

                    if(vm.activeclover == true){
                     vm.forscheduler();
                        }
                    else {

                      }

                } 
            });
        }

         $scope.cloverconnect();



function forscheduler(){
    $scope.promise = WizardModel.Scheduler();
    $scope.promise.then(function (response) { 
        if (response.statuscode == 0) { 
                   
            vm.selectedTimezone  =  response.data.timezone;  
            vm.datetimecustomer  =  response.data.schedule_at; 
            $scope.customer_account = response.data.customer_account;
            $scope.IncomeAccountRef = {
                value: response.data.income_account
                };
                $scope.AssetAccountRef = {
                value: response.data.assets_account
                };
                $scope.ExpenseAccountRef = {
                value: response.data.expense_account
               };
               $scope.DepositAccountRef = {
                value: response.data.deposit_account
             };

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


        function GetAccounts() {
            if(vm.activeclover == true) {
               
            $scope.promise = WizardModel.Accountreceivable();
            $scope.promise.then(function (response) {
         
                if (response.statuscode == 0) {
                
                    vm.Accreceivable = response.data;
                  
                    if (vm.Accreceivable.total_count > 0) {

                        $scope.account_expense = $filter('filter')(vm.Accreceivable.items, {
                            'AccountType': 'Cost of Goods Sold'
                        }, true);
                        $scope.account_income = $filter('filter')(vm.Accreceivable.items, {
                            'AccountType': 'Income'
                        }, true);
                        $scope.account_asset = $filter('filter')(vm.Accreceivable.items, {
                            'AccountType': 'Other Current Asset'
                        }, true);


                        // $scope.item.IncomeAccountRef = {
                        //     value: $scope.account_income[0].Id
                        // };
                        // $scope.item.AssetAccountRef = {
                        //     value: $scope.account_asset[0].Id
                        // };
                        // $scope.item.ExpenseAccountRef = {
                        //     value: $scope.account_expense[0].Id
                        // };


                    }


                    vm.isInvoiceLoaded = false;
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
         
         
   }


function submit() {
   
    var scheduletime = {
        scheduled_at: vm.datetimecustomer ,
         timezone: vm.selectedTimezone,
         income_account: $scope.IncomeAccountRef.value,
         assets_account: $scope.AssetAccountRef.value,
        expense_account: $scope.ExpenseAccountRef.value,
        deposit_account: $scope.DepositAccountRef.value,
        customer_account: $scope.customer_account
       };
       
   $scope.promise = WizardModel.Schedulertimezone(scheduletime);
   
   $scope.promise.then(function (response) {
    
       
    Clique.showToast(response.statusmessage, 'bottom right', 'success');

     vm.clover = true;
    localStorage.setItem("cloverstatus", vm.clover);
    vm.redirectapp();
});
}
       



    }
})();
