drop database tvshow_dev;
create database tvshow_dev;


\c tvshow_dev;

CREATE TABLE IF NOT EXISTS tvshow (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  genre VARCHAR(255),
  network VARCHAR(6),
  url VARCHAR(255),
  rating VARCHAR(255),
  showid VARCHAR(255)
);
