const mysql = require("mysql");
const Promise = require("bluebird");
const path = require("path");

/**
 * @class AppDAO
 * Regulate transactions between the `models` and the database
 *
 * @issue unable to load .env file for some reason
 * hence load config through `require`
 *
 * @example
 * module.exports = {
 *    host: "localhost",
 *    port: 3306,
 *    etc...
 * }
 *
 * @property {String} host,
 * @property {String} user,
 * @property {String} password,
 * @property {String} database,
 * @property {Number} port
 */

class AppDAO {

  constructor() {
    const DB_CREDENTIALS = require("./.db_credentials");
    this.db = mysql.createConnection(DB_CREDENTIALS);
    this.db.connect();
  }

  run (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params, (error, results, fields) => {
        if (error) {
          console.log(`Error with db query : ${sql}`);
          reject(error);
        } else {
          resolve({ id: results.insertId });
        }
      });
    });
  }

  get (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params, (error, results, fields) => {
        if (error) {
          console.log(`Error with db query : ${sql}`);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  all (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params, (error, results, fields) => {
        if (error) {
          console.log(`Error with db query : ${sql}`);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = AppDAO;
