(function () {
    'use strict';
    angular
        .module('transaction')
        .config(routeConfig);

    function routeConfig($stateProvider, triMenuProvider) {
        // first create a state that your menu will point to .
        $stateProvider
            .state('triangular.transaction', {
                url: '/synchistory',
                templateUrl: 'app/modules/transaction/transaction.tmpl.html',
                controller: 'TransactionController',
                controllerAs: 'vm'
            });
        // next add the menu item that points to the above state.
        triMenuProvider.addMenu({
            name: 'Orders',
            icon: 'zmdi zmdi-card',
            priority: 5.0,
            state: 'triangular.transaction',
            type: 'link',
            // permission: 'settings-listing',

        });
    }
})();
