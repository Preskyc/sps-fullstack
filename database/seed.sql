-- Seed data for movies
INSERT INTO movies (title, year) VALUES
  ('The Matrix', 1999),
  ('Inception', 2010),
  ('Pulp Fiction', 1994);

-- Seed data for ratings
INSERT INTO ratings (username, rating) VALUES
  ('alice', 5),
  ('bob', 4),
  ('charlie', 3);

-- Seed data for genres
INSERT INTO genres (name) VALUES
  ('Action'),
  ('Drama'),
  ('Comedy');