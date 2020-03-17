exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        { id: 1, role: "ADMIN", type: "ADMIN" },
        { id: 2, role: "MODERATOR", type: null },
        { id: 3, role: "SUPERUSER", type: null },
        { id: 4, role: "USER", type: null },
        { id: 5, role: "GUEST", type: null },
        { id: 6, role: "BANNED", type: null },
      ]);
    });
};
