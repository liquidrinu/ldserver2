class TokenModel {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
          CREATE TABLE IF NOT EXISTS tokens (
              id                INTEGER     PRIMARY KEY      AUTOINCREMENT,
              insertion_date    INTEGER                      NOT NULL     ,
              token             TEXT        UNIQUE           NOT NULL     ,
              type              TEXT                         NOT NULL
          )`;
    return this.dao.all(sql);
  }

  // CRUD
  insertToken(data) {
    return this.dao.run(
      `INSERT INTO tokens ( id, insertion_date, token, type )
        VALUES (?, ?, ?, ?)`,
      [data.id, data.insertion_date, data.token, data.type || "GENERAL"]
    );
  }

  getById(id) {
    return this.dao.all(`SELECT * FROM tokens WHERE id = ?`, [id]);
  }

  deleteById(id) {
    return this.dao.run(`DELETE FROM tokens WHERE id = ?`, [id]);
  }

  getByToken(token) {
    return this.dao.all(`SELECT * FROM tokens where token = ?`, [token]);
  }

  getByType(type) {
    return this.dao.all(`SELECT * FROM tokens WHERE type = ?`, [type]);
  }

  exists(token) {
    return this.dao.all(
      `SELECT EXISTS(SELECT 1 FROM TOKENS WHERE token = ? LIMIT 1)`,
      [token]
    );
  }
}

module.exports = TokenModel;
