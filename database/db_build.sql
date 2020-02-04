BEGIN;

DROP TABLE IF EXISTS cities, mentors, posts, likes;
CREATE TABLE IF NOT EXISTS cities (
    id    INTEGER,
    name    VARCHAR(100)
);

COMMIT;