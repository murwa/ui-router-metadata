angular.module('test-states', [
    'ui.router',
    'ui-router-metadata'
])
    .config(['$stateProvider', function ($stateProvider) {
        // Sample states
        $stateProvider
            .state({
                name: 'main',
                url: '/main',
                params: {
                    param1: false
                }
            });
    }]);