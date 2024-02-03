function printReport(pages) {
    console.log('Printing report:');
    for (const page of sortPages(pages)) {
        console.log('Found ' + page[1] + ' links to ' + page[0]);
    }
}

function sortPages(pages) {
    return Object.entries(pages).sort(([,a],[,b]) => b - a)
}

module.exports = {
    printReport,
    sortPages
}