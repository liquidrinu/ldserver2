class RolesModel {
  constructor(dao) {
    this.dao = dao;
  }

  createTable () {
    const sql = `
          CREATE TABLE IF NOT EXISTS roles (
              id                INTEGER       PRIMARY KEY   AUTO_INCREMENT,
              role              VARCHAR(255)                NOT NULL      ,
              type              VARCHAR(255)
          )`;
    return this.dao.run(sql);
  }

  // CRUD
  insertrole (data) {
    return this.dao.run(
      `INSERT INTO roles ( id, role, type )
          VALUES (?, ?, ?)`,
      [
        data.id,
        data.role || "USER",
        data.type || "GENERAL"
      ]
    );
  }

  getById (id) {
    return this.dao.all(`SELECT * FROM roles WHERE id = ?`, [id]);
  }

  deleteById (id) {
    return this.dao.run(`DELETE FROM roles WHERE id = ?`, [id]);
  }

  getByUsername (username) {
    return this.dao.all(`SELECT * FROM roles WHERE username = ?`, [username]);
  }

  deleteByUsername (username) {
    return this.dao.run(`DELETE FROM roles WHERE username = ?`, [username]);
  }

  getByrole (role) {
    return this.dao.all(`SELECT * FROM roles where role = ?`, [role]);
  }

  getByType (type) {
    return this.dao.all(`SELECT * FROM roles WHERE type = ?`, [type]);
  }

  exists (role) {
    return this.dao.run(
      `SELECT EXISTS(SELECT 1 FROM roles WHERE role = ? LIMIT 1)`,
      [role]
    );
  }
}

module.exports = RolesModel;
