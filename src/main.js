/**
 * UI-router metadata provider
 * @copyright @murwa 2017
 */

angular.module('ui-router-metadata', [
    'ui.router'
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
        this.$get = ['$state', function ($state) {
            return new MetadataService($state, config);
        }];

        /**
         * Error service
         * 
         * @param {*} $state 
         * @param {*} config 
         */
        function MetadataService($state, config) {
            // Init
            var self = this;

            /**
             * Get metadata value
             * @param {*}
             * @return {*|string}
             */
            self.get = function (key) {
                var meta = $state.$current.locals.globals['$meta'] || config;
                return key ? meta[key] : meta;
            }
        }
    }]);