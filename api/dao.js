const sqlite3 = require("sqlite3");
const Promise = require("bluebird");
const path = require("path");

// Data Access Object
class AppDAO {
  constructor() {
    const dbFilePath = "./primary.sqlite3.db";
    this.db = new sqlite3.Database(dbFilePath, err => {
      if (err) {
        console.log(`Could not connect to database", ${err}`);
      } else {
        console.log(`Connected to database: ${dbFilePath}`);
      }
    });
  }

  // Queries
  run (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          console.log(`Error with db query : ${sql}`);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  get (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  all (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = AppDAO;
