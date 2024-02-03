function error(...args) {
    console.error('\x1b[31m', ...args, '\x1b[0m');
 }

 module.exports = {
    error
}