const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

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



test('Get links from htmlBody', () => {
    const htmlBody = `<body>
<div>
    <a href="https://www.gnu.org/software/emacs/">Yay</a>
</div>
<p><a href="https://en.wikipedia.org/wiki/Bear" target="_blank">BEARS!</a></p>
<a href="page.html">Same folder</a>
<a href="/at-root.html">root level</a>
<a href="../up/here.html">up a level in a folder</a>
</body>`;
    expect(getURLsFromHTML(htmlBody, 'https://awesomesite.com/dir1/dir2/my-page.html'))
    .toStrictEqual([
        'https://www.gnu.org/software/emacs/',
        'https://en.wikipedia.org/wiki/Bear',
        'https://awesomesite.com/dir1/dir2/page.html',
        'https://awesomesite.com/at-root.html',
        'https://awesomesite.com/dir1/up/here.html'
    ]);
});