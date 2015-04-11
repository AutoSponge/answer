(function (GLOBAL) {
    var EMPTY = '';
    var SPACE = ' ';
    var ZERO = '0';
    var DECIMAL = '.';
    var HUNDRED = 'hundred';
    var wordMap = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety'
    };
    [16, 17, 18, 19].reduce(function (map, i) {
        map[i] = map[i - 10] + 'teen';
        return map;
    }, wordMap);

    [20, 30, 40, 50, 60, 70, 80, 90].forEach(function (base) {
        [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(function (map, i) {
            map[base + i] = map[base] + '-' + map[i];
            return map;
        }, wordMap);
    });

    function sentencify(str) {
        var _str = (str || EMPTY)
            .replace(/^\s+|\s$/g, EMPTY)
            .replace(/\s+/g, SPACE);

        return _str.substring(0, 1).toUpperCase() +
            _str.substring(1);
    }

    function isPrimitive(o) {
        return o !== Object(o);
    }

    function objectType(o) {
        return Object.prototype.toString.call(o);
    }

    function isNumber(n) {
        return (isPrimitive(n) || objectType(n) === '[object Number]') &&
            !isNaN(parseFloat(n)) &&
            isFinite(n);
    }

    function handleChunk(str, start, end) {
        var s = start;
        var len = end || str.length;
        while (str.charAt(s) === ZERO && s < len) {
            s += 1;
        }
        return s < len ? wordMap[str.substring(s, len)] : EMPTY;
    }

    function createHandler(name) {
        return function (str) {
            var result = handle[HUNDRED](str);
            return result ? result + SPACE + name : result;
        };
    }

    var index = [
        HUNDRED,
        'thousand',
        'million',
        'billion',
        'trillion',
        'quadrillion'
    ];

    var handle = index.reduce(function (handlers, name, i) {
        if (i > 0) {
            handlers[name] = createHandler(name);
        }
        return handlers;
    }, {});

    handle[HUNDRED] = function (str) {
        var len = str.length;
        var result = EMPTY;
        var hundreds = len === 3 ? handleChunk(str, 0, 1) : EMPTY;
        var more;
        if (hundreds) {
            result += hundreds + SPACE + HUNDRED;
        }
        more = handleChunk(str, hundreds ? 1 : 0);
        if (more) {
            result += SPACE + more;
        }
        if (!result) {
            result = wordMap[str] || EMPTY;
        }
        return result;
    };

    function fixCents(n) {
        var str = (n + EMPTY).substring(0, 2);
        while (str.length < 2) {
            str += ZERO;
        }
        return str;
    }

    function numberToString(n) {
        var _n = n;
        if (typeof _n === 'string') {
            _n = _n.replace(/,/g, EMPTY);
        }
        if (!isNumber(_n)) {
            return n;
        }
        var result = ' dollars';
        var str = parseFloat(_n) + EMPTY;
        var split = str.split(DECIMAL);
        var a = split[0] || ZERO;
        var b = fixCents(split[1] || EMPTY);
        var len = a.length;
        var firstChunkLength = len % 3;
        var allChunks = a.substring(firstChunkLength);
        var chunks = allChunks.match(/\d{3}/g);
        var count = 0;
        var chunkLength;
        var next;
        if (firstChunkLength) {
            if (chunks) {
                chunks.unshift(a.substring(0, firstChunkLength));
            } else {
                chunks = [a];
            }
        }
        chunkLength = chunks.length;
        result = 'and ' + b + '/100' + result;
        while (chunkLength--) {
            next = chunks[chunkLength];
            result = SPACE + result;
            result = handle[index[count]](next) + result;
            count += 1;
        }
        return sentencify(result);
    }

    if ( typeof module === 'undefined' ) {
        GLOBAL.numberToString = numberToString;
    } else {
        module.exports = numberToString;
    }
}(this));