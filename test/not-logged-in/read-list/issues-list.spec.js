var _ = require('lodash');
var lofcbg = require('../../../');

module.exports = function () {
  describe('get issues list', function () {
    it('should provide no comics in read list with an invalid user id', function (done) {
      lofcbg.readList.get('foo', function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(0);
        expect(readList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users read list', function (done) {
      lofcbg.readList.get(testUserId, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBeGreaterThan(0);
        _.each(readList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users read list', function (done) {
      lofcbg.readList.get(testUserId, { publishers: ['Image Comics'] }, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBeGreaterThan(0);
        _.each(readList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });

  describe('add issue to list', function () {
    it('should return error when adding to read list without permission', function (done) {
      lofcbg.readList.add(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to read list without permission', function (done) {
      lofcbg.readList.remove(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
