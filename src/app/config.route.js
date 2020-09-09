(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes

        // 404 & 500 pages
        $stateProvider
        .state('404', {
            url: '/404',
            views: {
                'root': {
                    templateUrl: '404.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('401', {
            url: '/401',
            views: {
                'root': {
                    templateUrl: '401.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('500', {
            url: '/500',
            views: {
                'root': {
                    templateUrl: '500.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        });


        // set default routes when no path specified
        debugger;

       var activeclover = localStorage.getItem("cloverstatus");

       if( activeclover == 'true')
       {
           console.log("activeclover", activeclover);
        $urlRouterProvider.when('', '/synchistory');
        $urlRouterProvider.when('/', '/synchistory'); 
       }
       else{
        console.log("activeclover", activeclover);
        $urlRouterProvider.when('', '/cloverwizard');
        $urlRouterProvider.when('/', '/cloverwizard');  
       }
        // $urlRouterProvider.when('', '/cloverwizard');
        // $urlRouterProvider.when('/', '/cloverwizard');
     
        // Use instead
            $urlRouterProvider.otherwise( function($injector) {
              var $state = $injector.get("$state");
              $state.go('/404');
            });

        // always goto 404 if route not found
        //$urlRouterProvider.otherwise('/404');
    }
})();
