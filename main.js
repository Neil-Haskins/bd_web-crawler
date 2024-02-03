const { error } = require('./error');
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');


async function main(mainURL) {
    if (!URL.canParse(mainURL)) {
        error('ERROR: Not a valid URL');
        return
    }

    console.log("Begginning crawl of " + mainURL);
    const pages = await crawlPage(mainURL, mainURL, {});
    printReport(pages);
}



if (process.argv.length < 3) {
    error('ERROR: Expected 1 argument, got 0')
} else if (process.argv.length > 3) {
    error(`ERROR: Expected 1 argument, got ${process.argv.length - 2}`)
} else {
    main(process.argv[2])
}