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
                image: null,
                descriptionLength: 160
            };
            // For optional use in config phase
            this.setDefaults = function (values) {
                if (angular.isObject(values)) {
                    angular.extend(defaults, values);
                    return this;
                }

                throw 'Defaults must be an object';
            }
            this.$get = ['$injector', function ($injector) {
                return new MetadataService($injector, defaults);
            }];

            /**
             * Error service
             * 
             * @param {*} $injector 
             * @param {*} config 
             */
            function MetadataService($injector, config) {
                // Init
                var self = this,
                    $filter = $injector.get('$filter'),
                    $state = $injector.get('$state'),
                    $location = $injector.get('$location');

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
                 * Get metadata description
                 * @return {string}
                 */
                self.getDescription = function () {
                    return $filter('limitTo')(self.get('description'), config.descriptionLength, '');
                }
                /**
                 * Metadata page url
                 * @return {string}
                 */
                self.getUrl = function () {
                    return $location.absUrl();
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
                    document.title = $metadata.getTitle();
                });
            });
        }]);
})(angular);