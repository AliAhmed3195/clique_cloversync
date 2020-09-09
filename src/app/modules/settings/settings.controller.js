(function () {
    'use strict';

    angular
        .module('settings')
        .controller('SettingsController', Controller)
   

    /* @ngInject */

    function Controller($window, $scope, $filter, $rootScope, $timeout, $interval, $q, $http, $compile, Clique, SettingModel, $mdDialog, $mdToast, $state)
    {

       var appConfig = Clique.configApp();
       $scope.appName = appConfig.appName;
       $scope.appLogo = appConfig.appLogo;
        var userInfo  = Clique.getUserInfo();
       console.log('username' ,userInfo)
       
       var vm = this;
       vm.openErpConnectDialog = openErpConnectDialog;
       vm.Accountreceivable = Accountreceivable;
       vm.cloverdisconnect = cloverdisconnect;
       vm.cloversyncDate = cloversyncDate;
       vm.timezonequery = timezonequery;
       vm.timequery = timequery;
       vm.searchTimezone = null;
       vm.searchTime = null;
       vm.count = 0;
       vm.counttimezone = 0;
       vm.itemSelectedtimezone = itemSelectedtimezone;
  
       vm.cloveropen = false;
       vm.status = true;
       $scope.showPaymentLink = false;
       vm.isInvoiceLoaded = true;
       vm.ispageloaded = true;
       vm.schedulertime = schedulertime;
       vm.forceSyncforQa = forceSyncforQa;
       vm.submit = submit;
       
       vm.timeitemSelected = timeitemSelected;
       vm.sheduletimezone = sheduletimezone;
       $scope.account_asset = [];
       $scope.account_income = [];
       $scope.account_expense = [];
       vm.poststatus1 = poststatus1;
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
  
  
            var date = new Date();
           var day = date.getDate();
          var  y = date.getFullYear();
         var   m = date.getMonth() ;
            
         $scope.fromDate = new Date(y, m, day );
            $scope.toDate = new Date(y, m, day);
            $scope.fromDate = $filter('date')($scope.fromDate, 'yyyy-MM-dd');
            $scope.toDate = $filter('date')($scope.toDate, 'yyyy-MM-dd');
         console.log("");

        function poststatus1(value){
        vm.isInvoiceLoaded = true; 
        vm.ispageloaded = true;
    
       var param = {
        is_active: value
        }

          $scope.promise = SettingModel.Poststatus(param);
       
       $scope.promise.then(function (response) {
        vm.schedulertime();
        vm.isInvoiceLoaded = false; 
        vm.ispageloaded = false;
    });
    }
    function sheduletimezone(value){
      
         vm.datetimecustomer = value;
        
 
          }
    

    function timeitemSelected(value){

        vm.count = vm.count + 1;
    }

    function itemSelectedtimezone(value){
     
        if(  value == undefined )
        {
           
        }
        else if(value.name)
        {
            vm.selectedTimezone = value.name;
        }
        else{
             vm.selectedTimezone = value;
        }


        console.log("vm.selectedTimezone " , vm.selectedTimezone ) ;
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

    function timequery(query) {
        var results = query ? vm.datetime.filter(createFilter(query)) : vm.datetime,
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

    function createFilter(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(timezone) {

            var DisplayName = angular.lowercase(timezone.time).toString();
            return ((DisplayName).indexOf(lowercaseQuery) === 0);
        };
    }

       
       $scope.cloverconnect = function() {

           $scope.promise = SettingModel.Statusconnect();
           $scope.promise.then(function (response) {
           
               if (response.statuscode == 0) {
                  
                   vm.activeclover = response.data.is_connected;
                   vm.Accountreceivable();
                   if(vm.activeclover == true){
                    vm.active = true;
                    localStorage.setItem("cloverstatus",vm.active);
                }

                    vm.schedulertime();
            
                //    vm.isInvoiceLoaded = false;
               } else {}
           });
       }
       $scope.cloverconnect();



       
       function Accountreceivable() {
         
           if(vm.activeclover == true) {
              
           $scope.promise = SettingModel.GetAccounts();
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

                }
                   vm.isInvoiceLoaded = false;
                   vm.ispageloaded = false;
               } else {}
           });
       }
   }

   $scope.settingdefaultcustomer = function() {

       if(vm.activeclover == true) {
       
                   $scope.promise = SettingModel.statuscustomer();
                   $scope.promise.then(function (response) {
                    
                       if (response.statuscode == 0) {
                           
                           vm.customersetting = response.data;
                           vm.statuscustomersetting = true;
                           vm.ispageloaded = false;
                       } else {}
                   });
               } 
           }    
       
           function schedulertime() {
                       $scope.promise = SettingModel.Schedulertimezone();
                       $scope.promise.then(function (response) {
                           if (response.statuscode == 0) {
                               vm.selectedTimezone  =  response.data.timezone;  
                               vm.datetimecustomer  =  response.data.schedule_at;    
                               vm.timemerchant =   vm.datetimecustomer;
                               $scope.is_active = response.data.is_active;
                            // $scope.is_active = true;
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
                        

                           } else {}
                       });
                   
               }
   



               $scope.setsDatetxndate =   function setsDatetxndate(value) { 
            
                  $scope.fromDate =  value;
                 }
                 $scope.setsDateDueDate =   function setsDateDueDate(value) { 
                
                       $scope.toDate =  value;
                      }
function cloversyncDate(){
    vm.isInvoiceLoaded = true; 
    vm.ispageloaded = true;
    $scope.fromDate = $filter('date')( $scope.fromDate, 'yyyy-MM-dd');
    $scope.toDate = $filter('date')( $scope.toDate , 'yyyy-MM-dd');
    var obj = {
            from_date:  $scope.fromDate,
            to_date:  $scope.toDate
    };
    $scope.promise = SettingModel.PostSyncDate(obj);
       
    $scope.promise.then(function (response) {
        vm.totalsyncrecord = response.data.length;
        vm.isInvoiceLoaded = false; 
        vm.ispageloaded = false;
    
        $scope.callsynced();
        Clique.showToast(response.statusmessage, 'bottom right', 'success');

 });
}

       function cloverdisconnect() {
        vm.isInvoiceLoaded = true; 
        vm.ispageloaded = true;
           $scope.promise = SettingModel.Statusdisconnect();
           $scope.promise.then(function (response) {
             
               if (response.statuscode == 0) {

                   vm.isInvoiceLoaded = false;  
                   vm.ispageloaded = false;
                   Clique.showToast(response.statusmessage, 'bottom right', 'success');  
                   vm.activeclover = false;
                   localStorage.setItem("cloverstatus",'false');
                  
               } else {
           
               }
           });
           vm.activeclover = false;
       }
      
        
     function forceSyncforQa(){
        
        vm.isInvoiceLoaded = true; 
        vm.syncbutton = false;
                      $scope.promise = SettingModel.Syncjob();
                       $scope.promise.then(function (response) {
                     
                           if (response.statuscode == 0) {
                          
                            Clique.showToast(response.statusmessage, 'bottom right', 'success');
                               vm.syncdata = response.data;   
                               vm.isInvoiceLoaded = false;  
                               vm.syncbutton = true;   
                           } 
                           else {
                            vm.isInvoiceLoaded = false;  
                           }
                       });
     }

     function submit() {
        vm.isInvoiceLoaded = true; 
        vm.ispageloaded = true;
    var scheduletime = {
        scheduled_at:  vm.datetimecustomer,
        timezone: vm.selectedTimezone,
        income_account: $scope.IncomeAccountRef.value,
        assets_account: $scope.AssetAccountRef.value,
        expense_account: $scope.ExpenseAccountRef.value,
        deposit_account: $scope.DepositAccountRef.value,
        customer_account: $scope.customer_account
      };

       $scope.promise = SettingModel.PostSchedulertimezone(scheduletime);
       
       $scope.promise.then(function (response) {
          
        Clique.showToast(response.statusmessage, 'bottom right', 'success');
        vm.schedulertime();
        vm.isInvoiceLoaded = false;  
    });
    }

    $scope.callsynced = function () {
       debugger;
        $mdDialog.show({
               
                templateUrl: 'app/modules/settings/syncrecords.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: null,
                clickOutsideToClose: true,
                fullscreen: true,
                scope: $scope,
                preserveScope: true
            })
            .then(function (answer) {}, function () {});
    }
        function openErpConnectDialog() {
      
         vm.cloveropen = true;
         $window.open('https://sandbox.dev.clover.com/oauth/authorize?client_id=KA2VAY1T9JPR4', 
         'C-Sharpcorner', 
        'toolbar=no,scrollbars=no,resizable=no,top=130,left=400,width=700,height=500');
        $scope.cloverconnect();

  }

       $scope.cancel = function () {
           $mdDialog.cancel();
       };

   }
})();
