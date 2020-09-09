(function () {
    'use strict';
    angular
        .module('wizard')
        .config(routeConfig);

    function routeConfig($stateProvider, triMenuProvider) {
        // first create a state that your menu will point to .
        $stateProvider
            .state('triangular.wizard', {
                url: '/cloverwizard',
                templateUrl: 'app/modules/wizard/wizard.tmpl.html',
                controller: 'WizardController',
                controllerAs: 'vm'
            });
     
    }
})();
