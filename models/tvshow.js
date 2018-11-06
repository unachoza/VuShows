const db = require('../db/config');

const Tvshow = {};

Tvshow.findAll = () => {
  return db.query(`SELECT * FROM tvshow`);
};

Tvshow.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM tvshow
    WHERE id = $1
  `,
    [id]
  );
};

Tvshow.create = tvshow => {
  return db.one(
    `
    INSERT INTO tvshow
    (flavor, description, rating, url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    [tvshow.flavor, tvshow.description, tvshow.rating, tvshow.url]
  );
};

Tvshow.update = (tvshow, id) => {
  return db.one(
    `
    UPDATE tvshow SET
      flavor = $1,
      description = $2,
      rating = $3,
      url = $4
    WHERE id = $5
    RETURNING *
  `,
    [tvshow.flavor, tvshow.description, tvshow.rating, tvshow.url, id]
  );
};

Tvshow.destroy = id => {
  return db.none(
    `
    DELETE FROM tvshow
    WHERE id = $1
  `,
    [id]
  );
};

module.exports = Tvshow;
