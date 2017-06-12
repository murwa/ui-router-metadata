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
            })
            .state({
                name: 'long-description',
                resolve: {
                    $meta: ['$timeout', function ($timeout) {
                        return {
                            title: 'Hello world',
                            description: '"This is a long string which is most likely more than 160 characters long. This is because the quick brown fox jumped over the lazy dog when the brown fox was not jumping over the lazy dog"'
                        }
                    }]
                }
            });
    }]);