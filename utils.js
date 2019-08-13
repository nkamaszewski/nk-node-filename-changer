const fs = require('fs');
const path = require('path');

const sortByDate = (files, dir) => {
    files.sort((a, b) => {
        const aStat = fs.statSync(path.join(dir, a));
        const bStat = fs.statSync(path.join(dir, b));
        return aStat.birthtime.getTime() - bStat.birthtime.getTime();
    });

    return files;
}

const newFilename = (format, ext, index) => {
    const formatted = format.replace(/(\$+)/, () => {
        const diff = 3 - String(index).length;
        return `${"0".repeat(diff < 0 ? 0 : diff)}${index}`;
    })
    return `${formatted}.${ext}`;
}

module.exports = {
    sortByDate,
    newFilename
}