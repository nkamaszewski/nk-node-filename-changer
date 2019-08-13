const args = process.argv.slice(2);

const getArgs = (arg) => {
    const index = args.indexOf(`--${arg}`);

    if (index !== -1 && args[index + 1]) {
        return args[index + 1];
    } else {
        return null;
    }
}

// checks if node was called with correct arguments
const validate = (args) => {
    let valid = true;
    args.forEach(arg => {
        if (!getArgs(arg)) {
            valid = false;
        }
    });
    return valid;
}

module.exports = {
    getArgs,
    validate,
}