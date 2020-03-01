class UserModel {
  constructor(dao) {
    this.dao = dao;
  }

  createTable () {
    const mysql = `
          CREATE TABLE IF NOT EXISTS users (
              id          INTEGER         PRIMARY KEY      AUTO_INCREMENT,
              username    VARCHAR(100)    UNIQUE           NOT NULL     ,
              password    VARCHAR(100)                     NOT NULL     ,
              alias       VARCHAR(100)                     NOT NULL     ,
              type        VARCHAR(100)    DEFAULT 'USER'   NOT NULL
          )`;
    return this.dao.all(mysql);
  }

  // CRUD
  insertUser (data) {
    return this.dao.run(
      `INSERT INTO users ( id, username, password, alias, type )
        VALUES (?, ?, ?, ?, ?)`,
      [
        data.id,
        data.username,
        data.password,
        data.alias || data.username,
        data.type || "USER"
      ]
    );
  }

  getHash (username) {
    return this.dao.get(`SELECT password FROM users WHERE username = ?`, [
      username
    ]);
  }

  verifyHash (username, hash) {
    return this.dao.run(
      `SELECT username, id FROM users WHERE username = ? AND password = ?`,
      [username, hash]
    );
  }

  getById (id) {
    return this.dao.all(`SELECT id, username FROM users WHERE id = ?`, [id]);
  }

  deleteById (id) {
    return this.dao.run(`DELETE FROM users WHERE id = ?`, [id]);
  }

  getByUsername (username) {
    return this.dao.get(`SELECT username, id FROM users WHERE username = ?`, [
      username
    ]);
  }

  getByType (type) {
    return this.dao.all(`SELECT * FROM users WHERE type = ?`, [type]);
  }

  updateAlias (id, alias) {
    return this.dao.run(`UPDATE users SET alias = ? WHERE id = ?`, [alias, id]);
  }

  updateType (id, type) {
    return this.dao.run(`UPDATE users SET type = ? WHERE id = ?`, [type, id]);
  }

  getAll () {
    return this.dao.all(`SELECT * FROM users`);
  }

  deleteAll () {
    return this.dao.all(`DELETE FROM users`);
  }
}

module.exports = UserModel;
