DROP DATABASE crypt_db;
CREATE DATABASE crypt_db;
\c crypt_db;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  hash VARCHAR NOT NULL
);

CREATE TABLE tokens (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  hash VARCHAR NOT NULL,
  tstamp BIGINT NOT NULL,
  ip VARCHAR NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE TABLE admin (
  id INT PRIMARY KEY NOT NULL,
  hash VARCHAR NOT NULL
);

CREATE TABLE shows (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  db_id INT NOT NULL,
  title VARCHAR NOT NULL,
  summary VARCHAR,
  air_start VARCHAR(10),
  air_end VARCHAR(10),
  popularity DECIMAL,
  rating DECIMAL,
  img VARCHAR(255),
  img_bg VARCHAR(255),
  network VARCHAR,
  seasons INT,
  episodes INT,
  episode_list TEXT
);

CREATE TABLE episodes (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  show_id INT REFERENCES shows(id) NOT NULL,
  db_id INT NOT NULL,
  db_episode_id INT NOT NULL,
  name VARCHAR,
  summary VARCHAR,
  season INT NOT NULL,
  episode INT NOT NULL,
  air_date VARCHAR(10),
  rating DECIMAL,
  img VARCHAR(255)
);

CREATE TABLE faves (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  show_id INT REFERENCES shows(id) NOT NULL
);
