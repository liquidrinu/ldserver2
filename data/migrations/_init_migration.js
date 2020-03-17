exports.up = function (knex) {
  return Promise.resolve(knex)
    .then(init_users(knex))
    .then(init_tokens(knex))
    .then(init_roles(knex))
    .then(() => {
      return knex.seed.run();
    })
    .finally(() => {
      console.log("initialized API's database + seeding");
    });
};

function init_users (knex) {
  return new Promise((resolve, reject) => {
    resolve(
      knex.schema.createTable("users", (t) => {
        t.increments("id")
          .unsigned()
          .primary();
        t.string("username").notNull();
        t.string("password").notNull();
        t.string("alias").notNull();
        t.integer("role").nullable();
        t.string("uuid", 36).nullable();
      })
    );
    reject();
  });
};

function init_tokens (knex) {
  return new Promise((resolve, reject) => {
    resolve(
      knex.schema.createTable("tokens", (t) => {
        t.increments("id")
          .unsigned()
          .primary();
        t.integer("user_id").nullable();
        t.string("username").notNull();
        t.string("insertion_date").notNull();
        t.integer("token").notNull();
        t.string("type").notNull();
      })
    );
    reject();
  });
};

function init_roles (knex) {
  return new Promise((resolve, reject) => {
    resolve(
      knex.schema.createTable("roles", (t) => {
        t.increments("id")
          .unsigned()
          .primary();
        t.string("role").notNull();
        t.string("type").nullable();
      })
    );
    reject();
  });
};

//.then(() => knex.destroy())

/////////////////////////////////////////////////////////////
exports.down = (knex) => {

};

