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

async function crawlPage(baseURL, currentUrl, pages) {
    if (!sameDomain(baseURL, currentUrl)) {
        return pages
    }

    const normalizedCurrentUrl = normalizeURL(currentUrl);
    console.log('Crawling: ' + normalizedCurrentUrl);
    
    if (normalizedCurrentUrl in pages) {
        pages[normalizedCurrentUrl] += 1;
        return pages
    } else if (normalizedCurrentUrl === normalizeURL(baseURL)) {
        pages[normalizedCurrentUrl] = 0;
    } else {
        pages[normalizedCurrentUrl] = 1;
    }

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

    const htmlBody = await response.text();
    const newURLs = getURLsFromHTML(htmlBody, baseURL);
    for (url of newURLs) {
        await crawlPage(baseURL, url, pages)
    }

    return pages
}


function sameDomain(url1, url2) {
    const a = new URL(url1);
    const b = new URL(url2);

    return a.hostname === b.hostname
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}