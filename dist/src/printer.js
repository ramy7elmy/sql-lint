"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Printer {
    constructor(verbosity, format) {
        this.verbosity = verbosity;
        this.format = format;
    }
    printCheck(checker, tokenised, prefix) {
        /**
         * If the checker is undefined, we make the assumption
         * that the check was specified in the 'ignore-errors'
         * array in the config and so we skip over it.
         */
        if (typeof checker === "undefined") {
            return;
        }
        const result = checker.check(tokenised);
        if (this.verbosity) {
            const queryForPrint = JSON.stringify(tokenised.getContent());
            const promptForPrint = `Linting Query: ${queryForPrint}`;
            const tokenisedForPrint = JSON.stringify(tokenised, null, 4);
            console.log(promptForPrint);
            console.log(tokenisedForPrint);
        }
        if (result.content) {
            console.log(this.format.getMessage(prefix, result));
            // If there are any errors whatsoever, we want to exit
            // with 1 for build scripts and the like.
            process.exitCode = 1;
        }
        if (this.verbosity) {
            console.log("\n-------------------------\n");
        }
    }
    warnAboutFileNotFound(file) {
        console.log(`Can't open file ${file}. Does it exist?`);
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map