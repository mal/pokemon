CREATE SCHEMA IF NOT EXISTS pokemon;

USE pokemon;

DROP TABLE IF EXISTS series;
CREATE TABLE IF NOT EXISTS series (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  code VARCHAR(2) NOT NULL,
  name VARCHAR(128) NOT NULl
) ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO series VALUES (1,   'EP', 'Original');
INSERT INTO series VALUES (2,   'AG', 'Advanced Generation');
INSERT INTO series VALUES (3,   'DP', 'Diamond & Pearl');
INSERT INTO series VALUES (4,   'BW', 'Best Wishes');
INSERT INTO series VALUES (5,   'XY', 'XY');

DROP TABLE IF EXISTS episodes;
CREATE TABLE episodes (
  code VARCHAR(6) NOT NULL PRIMARY KEY,
  series TINYINT UNSIGNED NULL DEFAULT NULL REFERENCES series (id) ON DELETE RESTRICT,
  number SMALLINT UNSIGNED NULL DEFAULT NULL,
  title VARCHAR(128) NOT NULL UNIQUE KEY,
  airdate DATE NULL DEFAULT NULL,
  chronology SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE KEY
) ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS seasons;
CREATE TABLE IF NOT EXISTS seasons (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  name VARCHAR(128) NOT NULL
) ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO seasons VALUES (1,   'Indigo League');
INSERT INTO seasons VALUES (2,   'Adventures in the Orange Islands');
INSERT INTO seasons VALUES (3,   'The Johto Journeys');
INSERT INTO seasons VALUES (4,   'Johto League Champions');
INSERT INTO seasons VALUES (5,   'Master Quest');
INSERT INTO seasons VALUES (6,   'Advanced');
INSERT INTO seasons VALUES (7,   'Advanced Challenge');
INSERT INTO seasons VALUES (8,   'Advanced Battle');
INSERT INTO seasons VALUES (9,   'Battle Frontier');
INSERT INTO seasons VALUES (10,  'Diamond and Pearl');
INSERT INTO seasons VALUES (11,  'Diamond & Pearl: Battle Dimension');
INSERT INTO seasons VALUES (12,  'Diamond & Pearl: Galactic Battles');
INSERT INTO seasons VALUES (13,  'Diamond & Pearl: Sinnoh League Victors');
INSERT INTO seasons VALUES (14,  'Black & White');
INSERT INTO seasons VALUES (15,  'Black & White: Rival Destinies');
INSERT INTO seasons VALUES (16,  'Black & White: Adventures in Unova');
INSERT INTO seasons VALUES (17,  'Pokémon the Series: XY');
INSERT INTO seasons VALUES (18,  'Pokémon the Series: XY (continued)');

DROP TABLE IF EXISTS dubs;
CREATE TABLE IF NOT EXISTS dubs (
  code VARCHAR(5) NOT NULL PRIMARY KEY REFERENCES episodes (code) ON DELETE CASCADE,
  season TINYINT UNSIGNED NULL DEFAULT NULL REFERENCES seasons (id) ON DELETE RESTRICT,
  number SMALLINT UNSIGNED NULL DEFAULT NULL,
  title VARCHAR(128) NOT NULL,
  airdate DATE NULL DEFAULT NULL
) ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;
