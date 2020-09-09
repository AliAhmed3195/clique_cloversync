(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', Controller)
   

    /* @ngInject */

    function Controller($window, $scope,$filter, $rootScope, $timeout, $interval, $q, $http, $compile, Clique,LoginModel, $mdDialog, $mdToast, $state)
    {
     
        var vm = this;
        vm.openCloverErpConnection = openCloverErpConnection;
    
        var activeclover = localStorage.getItem("cloverstatus");
       
        vm.openCloverErpConnection();

         function openCloverErpConnection() {
         
          

          $scope.promise = LoginModel.GetCloverloginStatus();
          $scope.promise.then(function (response) {
          
              if (response.statuscode == 0) {
         
                vm.activecloverlogin = response.data.is_connected;
                if(vm.activecloverlogin == true )
                {
                 
                
                    console.log("activeclover3", vm.activecloverlogin);
                    
                    localStorage.setItem("cloverstatus",vm.activecloverlogin);
                    var windowlocation = window.location; 
                    var windowredirect = windowlocation.origin+"/apps/cloversync/cloverwizard";
                    console.log("windowredirect123", windowredirect ); 
                    window.location.href = windowredirect;
                  
                }              
              else {
               
                // var a = window.opener.location;
                $window.open('https://sandbox.dev.clover.com/oauth/authorize?client_id=KA2VAY1T9JPR4', 
                'C-Sharpcorner', 
               'toolbar=no,scrollbars=no,resizable=no,top=60,left=320,width=700,height=600');
           
              


              setInterval(function(){
               




              },4000);





              }
            }
            });

    }



   }
})();
