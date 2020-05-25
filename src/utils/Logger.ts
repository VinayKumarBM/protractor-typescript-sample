const log = require('log4js').getLogger("Logger");

module.exports = {
    log: function (testCaseName:string, status:string) {
        log.info("================================================================================");
        log.info("\t\t\t <--{ "+testCaseName+" "+status.toUpperCase()+" }-->");
        log.info("================================================================================");
    },
    info: function(info:string) {
        log.info(info);
    }
}