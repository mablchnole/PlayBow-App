Database: PlayBow

CREATE TABLE playmates (
  id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100),
  breed VARCHAR(100),
  age INTEGER,
  gender VARCHAR(100),
  sterile VARCHAR(100),
  vaccinated VARCHAR(100),
  location VARCHAR(100),
  size VARCHAR(100),
  bio VARCHAR(1000),
  playstyles TEXT[],
	created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100),
  breed VARCHAR(100),
  age INTEGER,
  gender VARCHAR(100),
  sterile VARCHAR(100),
  vaccinated VARCHAR(100),
  location VARCHAR(100),
  size VARCHAR(100),
  bio VARCHAR(1000),
  playstyles TEXT[],
	created TIMESTAMP DEFAULT current_timestamp
);
