const { test, expect } = require('@jest/globals');
const { sortPages } = require('./report.js');


test('Sort an object', () => {
    const obj1 = {
        'String 3': 12,
        'String 1': -5,
        'string 2': 0
    };
    expect(sortPages(obj1))
        .toStrictEqual([
            ['String 3', 12],
            ['string 2', 0],
            ['String 1', -5]
        ]);
});