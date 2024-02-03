function normalizeURL(urlString) {
    if (urlString.slice(0,2) === '//') {
        urlString = 'http:' + urlString;
    }
    const url = new URL(urlString)
    return url.hostname + url.pathname
}

module.exports = {
    normalizeURL
}