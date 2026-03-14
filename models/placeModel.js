const db = require("../config/db");

exports.searchPlaces = (keyword, callback) => {
  const q = `%${keyword}%`;

  const sql = `
 SELECT *,
 
 CASE
  WHEN title LIKE ? THEN 3
  WHEN description LIKE ? THEN 2
  WHEN location LIKE ? THEN 1
  ELSE 0
 END AS score
 
 FROM places
 
 WHERE
 title LIKE ?
 OR description LIKE ?
 OR location LIKE ?
 
 ORDER BY score DESC
 
 LIMIT 15
 `;

  db.query(sql, [q, q, q, q, q, q], callback);
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
