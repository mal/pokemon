+function () {
    var rows = Array.prototype.slice.call(document.querySelectorAll('table tr'));
    var eps = [];

    function airdate(e) {
      var str = string(e.childNodes[0]);
      if (str === 'Unaired')
        return null;
      try {
        return new Date(str + ' UTC').toISOString().substr(0, 10);
      } catch (e) {}
    }

    function string(e) {
        return e.textContent.trim();
    }

    function title(e) {
      var str = string(e);
      if (str === 'N/A')
        return;
      return str;
    }

    var code = null,
        number = 0;

    var eps = rows.map(function (row) {
        // grab all columns
        var fields = row.querySelectorAll('td');

        // less than 7? not a metadata row
        if (fields.length < 7) return;

        var num = row.querySelector('th');
        if (num)
            number = parseInt(string(num), 10),
            code = 'M' + ('00' + number).substr(-2);
        else
            code += 'b';

        return {
            code: code,
            src: location.href,
            jpn: {
                title: string(fields[4].querySelector('i')),
                airdate: airdate(fields[5])
            },
            usa: {
                title: title(fields[1]),
                airdate: airdate(fields[2])
            }
        };
    });

    var rows = Array.prototype.slice.call(document.querySelectorAll('h2 + p + table tr'));
    console.log(rows);

    var number = 0;

    eps = eps.concat(rows.map(function (row) {
        // grab all columns
        var fields = row.querySelectorAll('td');

        // less than 5? not a metadata row
        if (fields.length < 5) return;

        return {
            code: 'TV' + ('00' + ++number).substr(-2),
            src: location.href,
            jpn: {
                title: string(fields[3].querySelector('i')),
                airdate: airdate(fields[4])
            },
            usa: {
                title: title(fields[1]),
                airdate: airdate(fields[2])
            }
        };
    }));

    // filter ignored rows
    eps = eps.filter(function (i) { return i; });

    // send it to app
    ATOM_SHELL_COMPLETE(eps);
}();
