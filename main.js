const { error } = require('./error');
const crawl = require('./crawl');


function main(mainURL) {
    if (!URL.canParse(mainURL)) {
        error('ERROR: Not a valid URL');
        return
    }

    crawl.crawlPage(mainURL);
}



if (process.argv.length < 3) {
    error('ERROR: Expected 1 argument, got 0')
} else if (process.argv.length > 3) {
    error(`ERROR: Expected 1 argument, got ${process.argv.length - 2}`)
} else {
    main(process.argv[2])
}