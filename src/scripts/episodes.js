+function () {
    var rows = Array.prototype.slice.call(document.querySelectorAll('table.roundy tr'));
    var eps = [];

    function airdate(e) {
      var str = string(e);
      if (str === 'Unaired')
        return;
      try {
        return new Date(str + ' UTC').toISOString().substr(0, 10);
      } catch (e) {}
    }

    function string(e) {
        return e.textContent.trim();
    }

    function title(e) {
      var str = string(e);
      if (str === 'No English title')
        return;
      return str;
    }

    var series = null,
        season = 1,
        dub = 0;

    var eps = rows.map(function (row) {
        // ignore header rows
        if (row.querySelector('th')) {
            return;
        }

        // ignore dub season break, but bump season number
        if (row.querySelector('td[colspan]')) {
            if (row.textContent.match(/This concludes season \d+/))
                season++, dub = 0;
            return;
        }

        // grab all columns
        var fields = row.querySelectorAll('td');

        // need these for conditionals in a minute
        var code = string(fields[0]),
            dubair = airdate(fields[4]),
            number = undefined;

        // handle regular episodes
        if (code !== '*')
            series = code.match(/^[A-Z]{1,2}/)[0],
            number = parseInt(code.match(/\d+/)[0], 10);

        return {
            code: code,
            src: location.href,
            jpn: {
                series: series,
                number: number,
                title: string(fields[3].querySelector('small')),
                airdate: airdate(fields[5])
            },
            usa: {
                season: season,
                number: dubair ? ++dub : undefined,
                title: title(fields[2]),
                airdate: dubair
            }
        };
    });

    // filter ignored rows
    eps = eps.filter(function (i) { return i; });

    // send it to app
    ATOM_SHELL_COMPLETE(eps);
}();
