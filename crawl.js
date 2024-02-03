const { error } = require('./error');
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

async function crawlPage(currentUrl) {
    let response
    try {
        response = await fetch(currentUrl);
    } catch (err) {
        error('ERROR: ' + err.message + '\n', 'URL: ' + currentUrl);
        return ''
    }
    if (response.status >= 400 && response.status < 500) {
        error('ERROR: Response status ' + response.status);
        return ''
    } else if (!response.headers.get("Content-Type").includes('text/html')) {
        error('ERROR: content-type was ' + response.headers.get("Content-Type") + ' should be "text/html"');
        return ''
    }

    console.log(await response.text());
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}