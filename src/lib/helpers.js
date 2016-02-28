var moment = require('moment-timezone');

moment.tz.add({
    "zones": {
      "America/Chicago": [
        "-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36",
        "-6 US C%sT 1920 -6",
        "-6 Chicago C%sT 1936_2_1_2 -6",
        "-5 - EST 1936_10_15_2 -5",
        "-6 Chicago C%sT 1942 -6",
        "-6 US C%sT 1946 -6",
        "-6 Chicago C%sT 1967 -6",
        "-6 US C%sT"
      ],
      "America/New_York": [
        "-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2",
        "-5 US E%sT 1920 -5",
        "-5 NYC E%sT 1942 -5",
        "-5 US E%sT 1946 -5",
        "-5 NYC E%sT 1967 -5",
        "-5 US E%sT"
      ]
    },
    "rules": {
      "US": [
        "1918 1919 2 0 8 2 0 1 D",
        "1918 1919 9 0 8 2 0 0 S",
        "1942 1942 1 9 7 2 0 1 W",
        "1945 1945 7 14 7 23 1 1 P",
        "1945 1945 8 30 7 2 0 0 S",
        "1967 2006 9 0 8 2 0 0 S",
        "1967 1973 3 0 8 2 0 1 D",
        "1974 1974 0 6 7 2 0 1 D",
        "1975 1975 1 23 7 2 0 1 D",
        "1976 1986 3 0 8 2 0 1 D",
        "1987 2006 3 1 0 2 0 1 D",
        "2007 9999 2 8 0 2 0 1 D",
        "2007 9999 10 1 0 2 0 0 S"
      ],
      "Chicago": [
        "1920 1920 5 13 7 2 0 1 D",
        "1920 1921 9 0 8 2 0 0 S",
        "1921 1921 2 0 8 2 0 1 D",
        "1922 1966 3 0 8 2 0 1 D",
        "1922 1954 8 0 8 2 0 0 S",
        "1955 1966 9 0 8 2 0 0 S"
      ],
      "NYC": [
        "1920 1920 2 0 8 2 0 1 D",
        "1920 1920 9 0 8 2 0 0 S",
        "1921 1966 3 0 8 2 0 1 D",
        "1921 1954 8 0 8 2 0 0 S",
        "1955 1966 9 0 8 2 0 0 S"
      ]
    },
    "links": {}
  });

module.exports = {
  makeTimezoney: function(date, timezone) {
    timezone = timezone || 'America/New_York';
    var timezoneyDate;
    if (typeof date === 'string' && date.indexOf('T') === 10 && date.length < 20) { //if it looks ISO-8601ish and there appears to be no timezone specifier, parse it as a date in the specified timezone
      timezoneyDate = moment.tz(date, timezone);
    } else {
      timezoneyDate = moment(date).tz(timezone); //otherwise let moment handle the parsing and converting
    }
    return timezoneyDate;
  },

  formatDate: function(date, format) {
    var formatted;
    format = format || defaultFormat;
    if (date) {
      var actualDate = moment(date);
      if (actualDate.isValid()) {
        formatted = actualDate.format(format).replace('EDT','ET').replace('EST', 'ET');
      }
    }
    return formatted;
  }
};
