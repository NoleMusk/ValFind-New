const db = require("../config/db");

exports.searchPlaces = (keyword, callback) => {
  const q = `%${keyword}%`;

  const sql = `
  SELECT *
  FROM places
  WHERE title LIKE ?
     OR description LIKE ?
     OR location LIKE ?
  LIMIT 15
  `;

  db.query(sql, [q, q, q], callback);
};

exports.autoComplete = (keyword, callback) => {
  const q = `%${keyword}%`;

  const sql = `
 SELECT title
 FROM places
 WHERE title LIKE ?
 ORDER BY title
 LIMIT 6
 `;

  db.query(sql, [q], callback);
};
