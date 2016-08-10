--Database: PlayBow

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
	created TIMESTAMP DEFAULT current_timestamp,
  city VARCHAR(100),
  email VARCHAR(100)
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
	created TIMESTAMP DEFAULT current_timestamp,
  city VARCHAR(100),
  email VARCHAR(100)
);

INSERT INTO playmates [ { id: 114,
    name: 'Toshi',
    breed: 'Shiba',
    age: '1',
    gender: 'Male',
    sterile: 'Yes',
    vaccinated: 'Yes',
    location: 'https://prime-digital-academy-playbow.s3.amazonaws.com/1468860313897',
    size: 'Small: 10-25 lbs',
    bio: 'I love to chase others and be chased too. I\'m high energy and very vocal! I\'d love to meet new friends.',
    playstyles: [ 'Chaser' ],
    created: Mon Jul 18 2016 11:45:14 GMT-0500 (CDT),
    city: 'Minneapolis',
    email: 'playbowdate@gmail.com' } ]
