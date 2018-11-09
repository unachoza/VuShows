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
    (name, genre, network, url, rating, showid)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
    [tvshow.name, tvshow.genre, tvshow.network, tvshow.url, tvshow.rating, tvshow.showid]
  );
};

Tvshow.update = (tvshow, id) => {
  return db.one(
    `
    UPDATE tvshow SET
      name = $1,
      genre = $2,
      network = $3,
      url = $4,
      rating = $5,
      showid = $6
    WHERE id = $7
    RETURNING *
  `,
    [tvshow.name, tvshow.genre, tvshow.network, tvshow.url, tvshow.rating, tvshow.showid, id]
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
