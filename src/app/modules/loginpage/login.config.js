(function () {
    'use strict';
    angular
        .module('login')
        .config(routeConfig);

    function routeConfig($stateProvider, triMenuProvider) {
        // first create a state that your menu will point to .
        $stateProvider
            .state('triangular.login', {
                url: '/cloverlogin',
                templateUrl: 'app/modules/loginpage/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
        // next add the menu item that points to the above state.
   
    }
})();
