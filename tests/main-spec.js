describe('ui-router-metadata module', function () {
    var $state, $metadata, $rootScope, $timeout;
    beforeEach(module('test-states'));
    beforeEach(inject(function (_$state_, _$metadata_, _$rootScope_, _$timeout_) {
        $state = _$state_;
        $metadata = _$metadata_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    it('should set null title when $meta is not defined on state', function () {
        $state.go('no-meta');
        $rootScope.$digest();
        expect($metadata.get('title')).toBe(null);
    });

    it('should return object when get is called with no key', function () {
        $state.go('meta-object');
        $rootScope.$digest();
        expect($metadata.get()).toEqual({
            title: 'Title',
            description: 'Description'
        });
    });

    it('should work with promises', function () {
        $state.go('meta-promise');
        $rootScope.$digest();
        $timeout.flush();
        expect($metadata.get()).toEqual({
            title: 'Promised title',
            description: 'Hello World'
        });
    });

    it('should get a value given a key', function () {
        $state.go('meta-promise');
        $rootScope.$digest();
        $timeout.flush();
        expect($metadata.get('title')).toBe('Promised title');
    });

    it('should set browser title', function () {
        $state.go('meta-promise');
        $rootScope.$digest();
        $timeout.flush();
        expect(document.title).toBe('Promised Title');
    });

    it('should truncate a description to 160 characters', function () {
        $state.go('long-description');
        $rootScope.$digest();
        $timeout.flush();
        expect(document.title).toBe('Hello World');
        expect($metadata.getDescription().length).toEqual(160);
    });
});