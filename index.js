const path = require('path');
const fs = require('fs');
const { getArgs, validate } = require('./argv');
const { sortByDate, newFilename } = require('./utils');

// node index.js --dir "images" --ext "png" --format "photo-$$$"

if (!validate(["dir", "ext", "format"])) {
    throw new Error("Node arguments are not correct!")
}

const dir = path.join(__dirname, getArgs("dir"));

fs.readdir(dir, (err, files) => {
    if (err) {
        throw err;
    }

    let validFiles = files.filter((file) => path.extname(file).slice(1) === getArgs('ext'));

    // sort by create date
    validFiles = sortByDate(validFiles, getArgs('dir'));

    validFiles.forEach((file, index) => {
        try {
            fs.renameSync(path.join(dir, file), path.join(dir, newFilename(getArgs('format'), getArgs('ext'), index + 1)));
        } catch (e) {
            throw new Error(`cannot change filename ${file}`);
        }
    });


});