const { showQuickPick } = require("./utils");
const { codeRefactoringEmptyMethods } = require("./coderefactoringemptymethods");
const { codeRefactoringUnusedUnits } = require("./coderefactoringunusedunits");

const codeRefactoring = async () => {
    let options = [
        "Remove Empty Methods",
        "Remove Unused Units"
    ];
    switch (options.indexOf(await showQuickPick("Select an option...", options))) {
        case 0:
            codeRefactoringEmptyMethods();
            break;
        case 1:
            codeRefactoringUnusedUnits();
            break;
    };
};

module.exports = {
    codeRefactoring
};