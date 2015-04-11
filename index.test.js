var test = require('tape');
var numberToString = require('.');
var obj = {};
var scenarios = [
    [null, null],
    [undefined, undefined],
    [obj, obj],
    [Date, Date],
    [false, false],
    [Infinity, Infinity],
    ['', ''],
    ['test', 'test'],
    [0, 'Zero and 00/100 dollars'],
    [0.01, 'Zero and 01/100 dollars'],
    [0.0123, 'Zero and 01/100 dollars'],
    [.0123, 'Zero and 01/100 dollars'], //jshint ignore:line
    [0.1, 'Zero and 10/100 dollars'],
    [1, 'One and 00/100 dollars'],
    [10, 'Ten and 00/100 dollars'],
    [12, 'Twelve and 00/100 dollars'],
    [15.3, 'Fifteen and 30/100 dollars'],
    [51, 'Fifty-one and 00/100 dollars'],
    [123, 'One hundred twenty-three and 00/100 dollars'],
    [1234, 'One thousand two hundred thirty-four and 00/100 dollars'],
    [12345, 'Twelve thousand three hundred forty-five and 00/100 dollars'],
    [123456, 'One hundred twenty-three thousand four hundred fifty-six and 00/100 dollars'],
    [1234567, 'One million two hundred thirty-four thousand five hundred sixty-seven and 00/100 dollars'],
    [12345678, 'Twelve million three hundred forty-five thousand six hundred seventy-eight and 00/100 dollars'],
    [123456789, 'One hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine and 00/100 dollars'],
    [100, 'One hundred and 00/100 dollars'],
    [new Number(100), 'One hundred and 00/100 dollars'], //jshint ignore:line
    ['100', 'One hundred and 00/100 dollars'],
    ['1E2', 'One hundred and 00/100 dollars'],
    [110, 'One hundred ten and 00/100 dollars'],
    [101, 'One hundred one and 00/100 dollars'],
    [1000, 'One thousand and 00/100 dollars'],
    [1001, 'One thousand one and 00/100 dollars'],
    [1010, 'One thousand ten and 00/100 dollars'],
    [1100, 'One thousand one hundred and 00/100 dollars'],
    ['1,100', 'One thousand one hundred and 00/100 dollars'],
    [1E4, 'Ten thousand and 00/100 dollars'],
    [1E5, 'One hundred thousand and 00/100 dollars'],
    [1E6, 'One million and 00/100 dollars'],
    [1E7, 'Ten million and 00/100 dollars'],
    [1E8, 'One hundred million and 00/100 dollars'],
    [1E9, 'One billion and 00/100 dollars'],
    [1E11, 'One hundred billion and 00/100 dollars'],
    [1E12, 'One trillion and 00/100 dollars'],
    [1E15, 'One quadrillion and 00/100 dollars'],
    [1E17, 'One hundred quadrillion and 00/100 dollars']
];

test('numberToString properly converts NaN', function (t) {
    t.plan(1);
    t.ok(isNaN(numberToString(NaN)));
});

scenarios.forEach(function (scenario) {
    test('numberToString properly converts ' + scenario[0], function (t) {
        t.plan(1);
        t.ok(numberToString(scenario[0]) === scenario[1], scenario[1]);
    });
});