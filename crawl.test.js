const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('Normalize https://example.com/', () => {
    expect(normalizeURL('https://example.com/'))
        .toBe('example.com/');
});

test('Normalize http://user:pass@example.com:80/blah/this.html?really=false&x=y#test2', () => {
    expect(normalizeURL('http://user:pass@example.com:80/blah/this.html?really=false&x=y#test2'))
    .toBe('example.com/blah/this.html');
});

test('Normalize httpxyz://example.tds:8342/blah/this.txt', () => {
    expect(normalizeURL('httpxyz://example.tds:8342/blah/this.txt'))
    .toBe('example.tds/blah/this.txt');
});

test('Normalize //example.com/index.html', () => {
    expect(normalizeURL('//example.com/index.html'))
    .toBe('example.com/index.html');
});

test('Normalize http://example.com/dir', () => {
    expect(normalizeURL('http://example.com/dir'))
    .toBe('example.com/dir');
});
