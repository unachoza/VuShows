const db = require('../db/config.js');
const Crypt = {};
const Tv = {};


///////////////////////////////////////
// ADMIN METHODS - REMOVE FOR DEPLOY //
///////////////////////////////////////

Crypt.allUsers = () => {
  return db.query(`
    SELECT * FROM users
  `);
};

Crypt.allTokens = () => {
  return db.query(`
    SELECT * FROM tokens
  `);
};

Crypt.getAdmin = () => {
  return db.oneOrNone(`
    SELECT * FROM admin
    WHERE id = 1
  `);
};

// Crypt.storeAdmin = hash => {
//   return db.one(`
//     INSERT INTO admin
//     (hash)
//     VALUES ($1)
//     RETURNING *
//   `, [hash]
//   );
// };

Crypt.deleteUsers = () => {
  return db.none(`
    DELETE FROM users *
  `);
};

Crypt.deleteTokens = () => {
  return db.none(`
    DELETE FROM tokens *
  `);
};



///////////////////////
// USER AUTH METHODS //
///////////////////////

Crypt.getUser = username => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [username]
  );
};

Crypt.destroyTokens = user_id => {
  return db.none(`
    DELETE FROM tokens
    WHERE user_id = $1
  `, [user_id]
  );
};

Crypt.storeToken = data => {
  return db.one(`
    INSERT INTO tokens
    (hash, tstamp, ip, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [data.hash, data.tstamp, data.ip, data.user_id]
  );
};

Crypt.getToken = ip => {
  return db.oneOrNone(`
    SELECT * FROM tokens
    WHERE ip = $1
  `, [ip]
  );
};

Crypt.checkUserExists = username => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [username]
  );
};

Crypt.createUser = data => {
  return db.one(`
    INSERT INTO users
    (username, hash)
    VALUES ($1, $2)
    RETURNING *
  `, [data.username, data.hash]
  );
};



//////////////////////
// API DATA METHODS //
//////////////////////

Tv.index = () => {
  return db.query(`
    SELECT * FROM tvshow
  `);
};

Tv.single = id => {
  return db.oneOrNone(`
    SELECT * FROM tvshow
    WHERE id = $1
  `, [id]
  );
};

Tv.add = data => {
  return db.one(`
    INSERT INTO tvshow
    (name, genre, network, url, rating, showid)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [tvshow.name, tvshow.genre, tvshow.network, tvshow.url, tvshow.rating, tvshow.showid]
  );
};

Tv.update = (data, id) => {
  return db.one(`
    UPDATE tvshow SET
      name = $1,
      genre = $2,
      network = $3,
      url = $4,
      rating = $5,
      showid = $6
    WHERE id = $7
    RETURNING *
  `, [tvshow.name, tvshow.genre, tvshow.network, tvshow.url, tvshow.rating, tvshow.showid, id]
  );
};

Tv.destroy = id => {
  return db.none(`
    DELETE FROM tvshow
    WHERE id = $1
  `, [id]
  );
};



module.exports = { Crypt, Tv };
