const { JSDOM } = require('jsdom');

function normalizeURL(urlString) {
    if (urlString.slice(0,2) === '//') {
        urlString = 'http:' + urlString;
    }
    const url = new URL(urlString);
    return url.hostname + url.pathname
}

function getURLsFromHTML(htmlBody, baseURL) {
    const { document } = (new JSDOM(htmlBody)).window;
    const aEls = [...document.querySelectorAll('a[href]')];
    return aEls.map((a) => {
        if ( URL.canParse(a.href) ) {
            return a.href
        } else {
            const url = new URL(a.href, baseURL)
            return url.href
        }
    });
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}