module.exports = grammar({
  name: 'logfiles',

  rules: {
    // TODO: add the actual grammar rules
    logline: ($) =>
      seq(
        $.timestamp,
        optional($.hostname),
        optional($.servicename),
        optional(': '),
        optional($.loglevel),
        $.message
      ),

    // Primitives {{{
    timestamp: ($) =>
      choice(
        seq($.isodate, /[T ]/, $.isotime)
      ),

    years: (_) => /[0-9]\{4}/,
    monthstext: (_) => /Jan|Feb|Mar|Apr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dec/,
    monthsnum:  (_) => /[0-9]\{2}/,
    days: (_) => /[0-9]\{2}/,

    isodate: (_) =>
      seq(
        $.years, '-', choice($.monthstext, $.monthsnum), '-', $.days
      ),

    isotime: (_) => /[0-9]\{2}:[0-9]\{2}:[0-9]\{2}\.[0-9]*[+-][0-9]\{2}(:[0-9]{2})?/,

    hostname: (_) => / [a-zA-Z0-9_-]* /,

    servicename: (_) => / [a-zA-Z0-9\[[0-9]*\]_-]*/,

    loglevel: (_) =>
      choice(
        'ERROR',
        'INFO',
        'DEBUG',
        'TRACE'
      ),

    message: (_) => /.*$/

    // }}}
  }
});
