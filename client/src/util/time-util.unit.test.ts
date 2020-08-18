import * as timeUtil from './time-util';

describe('Time utilities', () => {
  describe('isTradingDate', () => {
    test('Weekend dates are not trading hours', () => {
      const testDates = [
        '2020-08-15:12:00:00Z', // Saturday August 15, 2020 noon GMT
        '2020-08-16:12:00:00Z', // Sunday August 16, 2020 noon GMT
      ];
      testDates.forEach((date) => {
        expect(timeUtil.isTradingDate(date)).toBe(false);
      });
    });

    test('Outside of 13:30-20:30GMT are not trading hours', () => {
      const testDates = [
        '2020-08-19T05:00:00Z',
        '2020-08-19T09:29:00Z',
        '2020-08-19T20:31:00Z',
        '2020-08-19T21:08:00Z',
      ];
      testDates.forEach((date) => {
        expect(timeUtil.isTradingDate(date)).toBe(false);
      });
    });

    test('Inside of 13:30-20:30GMT and a weekday are trading hours', () => {
      const testDates = [
        '2020-08-17T13:30:00Z', // Monday
        '2020-08-18T15:00:00Z', // Tuesday
        '2020-08-19T17:52:00Z', // Wednesday
        '2020-08-20T18:14:00Z', // Thursday
        '2020-08-21T20:30:00Z', // Friday
      ];
      testDates.forEach((date) => {
        expect(timeUtil.isTradingDate(date)).toBe(true);
      });
    });
  });
});
