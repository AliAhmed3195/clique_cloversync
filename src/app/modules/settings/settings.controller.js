(function () {
    'use strict';

    angular
        .module('settings')
        .controller('SettingsController', Controller)
   

    /* @ngInject */

    function Controller($window, $scope,$filter, $rootScope, $timeout, $interval, $q, $http, $compile, Clique, SettingModel, $mdDialog, $mdToast, $state)
    {

       var appConfig = Clique.configApp();
       $scope.appName = appConfig.appName;
       $scope.appLogo = appConfig.appLogo;
        var userInfo  = Clique.getUserInfo();
       console.log('username' ,userInfo)
       
       var vm = this;
       vm.openErpConnectDialog = openErpConnectDialog;
       vm.clearingaccount      = clearingaccount;
       vm.Accountreceivable = Accountreceivable;
       vm.cloverdisconnect = cloverdisconnect;
       vm.timezonequery = timezonequery;
       vm.timequery = timequery;
       vm.searchTimezone = null;
       vm.searchTime = null;
       vm.count = 0;
       vm.counttimezone = 0;
       vm.itemSelectedtimezone = itemSelectedtimezone;
    //    vm.connectedclover = connectedclover;
       // vm.settingdefaultcustomer = settingdefaultcustomer;
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
       vm.timezone = [
        { category: 'United States', name: 'AST' },
        { category: 'United States', name: 'EST' },
        { category: 'United States', name: 'CST' },
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


    function sheduletimezone(value){
        debugger;
         vm.datetimecustomer = value;
        
 
          }
    

    function timeitemSelected(value){
        debugger;
     //   vm.datetimecustomer = value.time + value.category;
        vm.count = vm.count + 1;
    }

    function itemSelectedtimezone(value){
        debugger;
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
                   debugger;
                   vm.activeclover = response.data.is_connected;

                   if(vm.activeclover == true){
                    vm.active = true;
                    localStorage.setItem("cloverstatus",vm.active);
                }

                    vm.schedulertime();
            
                   vm.isInvoiceLoaded = false;
               } else {}
           });
       }
       $scope.cloverconnect();



       
       function Accountreceivable() {
           if(vm.activeclover == true) {
              
           $scope.promise = SettingModel.Accountreceivable();
           $scope.promise.then(function (response) {
          
               if (response.statuscode == 0) {
                 
                   vm.Accreceivable = response.data;
                   vm.statusAccreceivable = true;
                   vm.isInvoiceLoaded = false;
                   vm.ispageloaded = false;
               } else {}
           });
       }
   }
        
     
           function clearingaccount() {
if(vm.activeclover == true) {

           $scope.promise = SettingModel.clearingaccount();
           $scope.promise.then(function (response) {
            
               if (response.statuscode == 0) {
                   
                   vm.accclearing = response.data;
                   vm.statusclearingaccount = true;
                   
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
debugger;
                       $scope.promise = SettingModel.Schedulertimezone();
                       $scope.promise.then(function (response) {
                        debugger;
                           if (response.statuscode == 0) {
                               
                              
                               vm.selectedTimezone  =  response.data.items[0].timezone;  
                               vm.datetimecustomer  =  response.data.items[0].schedule_at;    
                               vm.timemerchant =   vm.datetimecustomer;       
                           } else {}
                       });
                   
               }
   


       function cloverdisconnect() {
        vm.isInvoiceLoaded = true; 
           $scope.promise = SettingModel.Statusdisconnect();
           $scope.promise.then(function (response) {
             
               if (response.statuscode == 0) {
debugger;
                   vm.isInvoiceLoaded = false;  
                   Clique.showToast(response.statusmessage, 'bottom right', 'success');  
                   vm.activeclover = false;
                   localStorage.setItem("cloverstatus",'false');
                  
               } else {
                vm.isInvoiceLoaded = false;  
               }
           });
           vm.activeclover = false;
       }
      
        
     function forceSyncforQa(){
         debugger;
        vm.isInvoiceLoaded = true; 
        vm.syncbutton = false;
                      $scope.promise = SettingModel.Syncjob();
                       $scope.promise.then(function (response) {
                        debugger;
                           if (response.statuscode == 0) {
                            debugger;
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
        debugger;

        vm.isInvoiceLoaded = true; 
    var scheduletime = {
        scheduled_at:  vm.datetimecustomer,
        timezone: vm.selectedTimezone
      };

      
   


       $scope.promise = SettingModel.PostSchedulertimezone(scheduletime);
       
       $scope.promise.then(function (response) {
           debugger;
        Clique.showToast(response.statusmessage, 'bottom right', 'success');
        vm.schedulertime();
        vm.isInvoiceLoaded = false;  
    });
    }


        function openErpConnectDialog() {
        debugger;
         vm.cloveropen = true;
         $window.open('https://sandbox.dev.clover.com/oauth/authorize?client_id=KA2VAY1T9JPR4', 
         'C-Sharpcorner', 
        'toolbar=no,scrollbars=no,resizable=no,top=130,left=400,width=700,height=500');
        $scope.cloverconnect();

  }

// function connectedclover(){
//     $scope.promise = SettingModel.Statusconnect();
//     $scope.promise.then(function (response) {
    
//         if (response.statuscode == 0) {
//             debugger;
//             vm.activeclover = response.data.is_connected;

//             if(vm.activeclover == true){
//                 vm.active = true;
//                 localStorage.setItem("cloverstatus",vm.active);
//             }


//         } else {}
//     });
// }



       $scope.cancel = function () {
           $mdDialog.cancel();
       };




   }
})();
