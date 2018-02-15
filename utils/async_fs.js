const fs = require('fs');

const writeFile = (path, data, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.writeFile(path, data, opts, (err) => {
            // if (err) rej(err)
			if (err) console.log(err);
            else res()
        })
    });

const readFile = (path, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err);
            else res(data)
        })
    });

module.exports = {
    readFile,
    writeFile
};