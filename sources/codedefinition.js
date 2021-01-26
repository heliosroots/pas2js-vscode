const { createLocation, changedFiles } = require("./utils");
const { execCodetools } = require("./base");

class CodeDefinition {
    async provideDefinition(document, position) {  
        let resp = await execCodetools({
            action: "codeDefinition",
            path: document.uri.fsPath,
            line: position.line + 1,
            column: position.character + 1,
            updates: await changedFiles()
        }); 
        if (!resp.success) {
            return 
        }; 
        return createLocation(resp.data.path, resp.data.line -1, resp.data.column -1);
    };
};

module.exports = {
    CodeDefinition
};