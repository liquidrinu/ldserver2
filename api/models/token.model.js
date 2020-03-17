class TokenModel {
  constructor(dao) {
    this.dao = dao;
  }

  createTable () {
    const sql = `
          CREATE TABLE IF NOT EXISTS tokens (
              id                INTEGER       PRIMARY KEY   AUTO_INCREMENT,
              user_id           INTEGER                                   ,
              username          VARCHAR(255)                NOT NULL      ,
              insertion_date    INTEGER                     NOT NULL      ,
              token             VARCHAR(255)                NOT NULL      ,
              type              VARCHAR(100)                NOT NULL
          )`;
    return this.dao.run(sql);
  }

  // CRUD
  insertToken (data) {
    return this.dao.run(
      `INSERT INTO tokens ( id, user_id, username, insertion_date, token, type )
        VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.user_id || 0,
        data.username,
        data.insertion_date,
        data.token,
        data.type || "GENERAL"
      ]
    );
  }

  getById (id) {
    return this.dao.all(`SELECT * FROM tokens WHERE id = ?`, [id]);
  }

  getByUsername (username) {
    return this.dao.all(`SELECT * FROM tokens WHERE username = ?`, [username]);
  }

  deleteById (id) {
    return this.dao.run(`DELETE FROM tokens WHERE id = ?`, [id]);
  }

  deleteByUsername (username) {
    return this.dao.run(`DELETE FROM tokens WHERE username = ?`, [username]);
  }

  getByToken (token) {
    return this.dao.all(`SELECT * FROM tokens where token = ?`, [token]);
  }

  getByType (type) {
    return this.dao.all(`SELECT * FROM tokens WHERE type = ?`, [type]);
  }

  exists (token) {
    return this.dao.run(
      `SELECT EXISTS(SELECT 1 FROM TOKENS WHERE token = ? LIMIT 1)`,
      [token]
    );
  }
}

module.exports = TokenModel;
