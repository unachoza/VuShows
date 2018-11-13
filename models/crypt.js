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

Crypt.deleteShows = () => {
  return db.none(`
    DELETE FROM shows *
  `);
};

Crypt.deleteFaves = () => {
  return db.none(`
    DELETE FROM faves *
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

Tv.indexShows = () => {
  return db.query(`
    SELECT * FROM shows
  `);
};

Tv.indexEpisodes = () => {
  return db.query(`
    SELECT * FROM episodes
  `);
};

Tv.show = id => {
  return db.oneOrNone(`
    SELECT * FROM shows
    WHERE id = $1
  `, [id]
  );
};

Tv.episodes = show_id => {
  return db.query(`
    SELECT * FROM episodes
    WHERE show_id = $1
  `, [show_id]
  );
}

Tv.showByDbId = db_id => {
  return db.oneOrNone(`
    SELECT * FROM shows
    WHERE db_id = $1
  `, [db_id]
  );
};

Tv.episodeByDbId = db_episode_id => {
  return db.oneOrNone(`
    SELECT * FROM episodes
    WHERE db_episode_id = $1
  `, [db_episode_id]
  );
}

Tv.addShow = data => {
  return db.one(`
    INSERT INTO shows
    (db_id, title, summary, air_start, air_end, popularity, rating, img, img_bg, network, seasons, episodes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
  `, [data.db_id, data.title, data.summary, data.air_start, data.air_end, data.popularity, data.rating, data.img, data.img_bg, data.network, data.seasons, data.episodes]
  );
};

Tv.addEpisode = (data, id) => {
  return db.one(`
    INSERT INTO episodes
    (show_id, db_id, db_episode_id, name, summary, season, episode, air_date, rating, img)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `, [id, data.db_id, data.db_episode_id, data.name, data.summary, data.season, data.episode, data.air_date, data.rating, data.img]
  );
};

Tv.updateShow = (data, id) => {
  return db.one(`
    UPDATE shows SET
      db_id = $1,
      title = $2,
      summary = $3,
      air_start = $4,
      air_end = $5,
      popularity = $6,
      rating = $7,
      img = $8,
      img_bg = $9,
      network = $10,
      seasons = $11,
      episodes = $12
    WHERE id = $13
    RETURNING *
  `, [data.db_id, data.title, data.summary, data.air_start, data.air_end, data.popularity, data.rating, data.img, data.img_bg, data.network, data.seasons, data.episodes, id]
  );
}

Tv.updateEpisode = (data, id) => {
  return db.one(`
    UPDATE episodes SET
      db_id = $1,
      db_episode_id = $2,
      name = $3,
      summary = $4,
      season = $5,
      episode = $6,
      air_date = $7,
      rating = $8,
      img = $9
    WHERE id = $10
    RETURNING *
  `, [data.db_id, data.db_episode_id, data.name, data.summary, data.season, data.episode, data.air_date, data.rating, data.img, id]
  );
};

Tv.getFaves = user_id => {
  return db.query(`
    SELECT * FROM shows
    JOIN faves ON shows.id = faves.show_id
    WHERE faves.user_id = $1
  `, [user_id]
  );
};

Tv.getFaveByIds = (user_id, show_id) => {
  return db.oneOrNone(`
    SELECT * FROM faves
    WHERE user_id = $1 AND show_id = $2
  `, [user_id, show_id]
  );
};

Tv.addFave = (user_id, show_id) => {
  return db.one(`
    INSERT INTO faves
    (user_id, show_id)
    VALUES ($1, $2)
    RETURNING *
  `, [user_id, show_id]
  );
};

Tv.destroyFave = id => {
  return db.none(`
    DELETE FROM faves
    WHERE id = $1
  `, [id]
  );
};



module.exports = { Crypt, Tv };
