(function () {
    'use strict';

    angular
        .module('transaction')
        .controller('TransactionController', Controller)
   

    /* @ngInject */

    function Controller($window, $scope,$filter, $rootScope, $timeout, $interval, $q, $http, $compile, Clique, OrderModel, $mdDialog, $mdToast, $state)
    {
        var vm = this;
        vm.TransactionLoaded = true;
        vm.getOrders = getOrders;
        vm.Retryorder = Retryorder;
        vm.processapi = true;
        var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
        vm.fromDate = new Date(y, m, 1);
        vm.toDate = new Date(y, m + 1, 0)
        vm.query = {
            order: 'id',
            limit: 100,
            page: 1
        };

         vm.getOrders();

function getOrders() {
    
    // vm.fromDates = $filter('date')(vm.fromDate, "yyyy-MM-dd");
    // vm.toDates = $filter('date')(vm.toDate, "yyyy-MM-dd");
    vm.TransactionLoaded = true;
    vm.processapi = false;
    vm.pagequery = {
        fromDates : $filter('date')(vm.fromDate, "yyyy-MM-dd"),
        toDate : $filter('date')(vm.toDate, "yyyy-MM-dd")
    };

        $scope.promise = OrderModel.GetTransactionHistory(vm.pagequery);
        $scope.promise.then(function (response) {
        
            if (response.statuscode == 0) {
                debugger;
                vm.Data = response.data.items;
                vm.TransactionLoaded = false;
                vm.processapi = true;
            } else {}
        });

    }

    function Retryorder(value){
        debugger;
        vm.processapi = false;
        vm.TransactionLoaded = true;
        var order = {
            id:  value.id
            
          };
        $scope.promise = OrderModel.GetOrderRetry(order);
       
      
        $scope.promise.then(function (response) {
        if(response.statuscode == 0)
        {
            debugger;
            vm.getOrders();
            // vm.processapi = true;
            Clique.showToast(response.statusmessage, 'bottom right', 'success');
         }
        else {
        vm.getOrders();
        vm.processapi = true;
        Clique.showToast(response.statusmessage, 'bottom right', 'error');
         }
     });

    }


   }
})();
