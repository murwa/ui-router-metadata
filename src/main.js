/**
 * UI-router metadata provider
 * @copyright @murwa 2017
 */
(function (angular) {
    angular.module('ui-router-metadata', [
        'ui.router',
        'angular-utility-filters.uc-words'
    ])
        .provider('$metadata', [function MetadataProvider() {
            // Define defaults
            var defaults = {
                title: null,
                description: null,
                image: null
            };
            // For optional use in config phase
            this.setDefaults = function (values) {
                if (angular.isObject(values)) {
                    angular.extend(defaults, values);
                    return this;
                }

                throw 'Defaults must be an object';
            }
            this.$get = ['$state', '$filter', function ($state, $filter) {
                return new MetadataService($state, defaults, $filter);
            }];

            /**
             * Error service
             * 
             * @param {*} $state 
             * @param {*} config 
             */
            function MetadataService($state, config, $filter) {
                // Init
                var self = this;

                /**
                 * Get metadata value
                 * @param {*}
                 * @return {*|string}
                 */
                self.get = function (key) {
                    var meta = resolveMeta();
                    return key ? meta[key] : meta;
                }
                /**
                 * Get metadata title.
                 * @return {string}
                 */
                self.getTitle = function () {
                    return $filter('ucWords')(self.get('title'));
                }

                /**
                 * Resolve metadata
                 * @return {*}
                 */
                function resolveMeta() {
                    return $state.$current.locals.globals['$meta'] || config;
                }
            }
        }])
        .run(['$metadata', '$rootScope', '$timeout', function ($metadata, $rootScope, $timeout) {
            $rootScope.$on('$stateChangeSuccess', function () {
                $timeout(function () {
                    window.title = $metadata.getTitle();
                });
            });
        }]);
})(angular);