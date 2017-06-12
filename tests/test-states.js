angular.module('test-states', [
    'ui.router',
    'ui-router-metadata'
])
    .config(['$stateProvider', function ($stateProvider) {
        // Sample states
        $stateProvider
            .state({
                name: 'no-meta'
            })
            .state({
                name: 'meta-object',
                resolve: {
                    $meta: [function () {
                        return {
                            title: 'Title',
                            description: 'Description'
                        };
                    }]
                }
            })
            .state({
                name: 'meta-promise',
                resolve: {
                    $meta: ['$timeout', function ($timeout) {
                        return $timeout(function () {
                            return {
                                title: 'Promised title',
                                description: 'Hello World'
                            };
                        });
                    }]
                }
            });
    }]);