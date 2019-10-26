const fs = require('fs');

module.exports = {
    ////////////////////////
    //  String functions  //
    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Pads a string with whitespace at < 4 args
     * otherwise will substitute character of choice
     * @param {string} str    - the string that needs padding
     * @param {number} begin  - amount to pad in front
     * @param {number} end    - amount to pad at the end
     * @param {string} [char1] - optional char substitution
     * @param {string} [char2] - optional char substitution
     */

    strPad: (str, begin, end, char1, char2) =>
        typeof char2 !== 'string'
            ? [...Array(begin), str, ...Array(end || 0)].join(char1 || ' ')
            : [...Array(begin + 1).join(char1), str, Array(end + 1).join(char2 || char1)].join(''),

    //////////////////////
    //  JSON functions  //
    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Write Json to Filesystem
     *
     * @param {string} path    - path->filename to write to
     * @param {object} data    - JSON object
     */

    /* filesystem operations */
    jsonFsWrite: (path, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${path}.json`, JSON.stringify(data), function (err) {
                if (err) throw err;
                console.log(`File saved succesfully at '${path}'`);
                resolve(data);
                reject(err);
            });
        });
    },

    /**
     * Read Json from Filesystem & parse
     *
     * @param {string} path    - path->filename to write to
     * @returns {object}       - JSON object
     */

    jsonFsRead: (path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", function (err, data) {
                if (err) throw err;
                resolve(JSON.parse(data));
                reject(err);
            });
        });
    },

    mergeById: (newData, oldData, key) =>
        newData.map(itm => ({
            ...oldData.find((item) => (item[key] === itm[key]) && item),
            ...itm
        }))
};