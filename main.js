const { error } = require('./error');
const crawl = require('./crawl');


async function main(mainURL) {
    if (!URL.canParse(mainURL)) {
        error('ERROR: Not a valid URL');
        return
    }

    const pages = await crawl.crawlPage(mainURL, mainURL, {});
    console.log(pages);
}



if (process.argv.length < 3) {
    error('ERROR: Expected 1 argument, got 0')
} else if (process.argv.length > 3) {
    error(`ERROR: Expected 1 argument, got ${process.argv.length - 2}`)
} else {
    main(process.argv[2])
}