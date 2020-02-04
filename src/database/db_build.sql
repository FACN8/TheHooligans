BEGIN;

DROP TABLE IF EXISTS city,
hostel,
reservation,
guest;

CREATE TABLE city (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL
);

CREATE TABLE hostel (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  capacity integer,
  description varchar(100),
  contact_info varchar(100),
  city_id integer
);

CREATE TABLE guest (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  hostel_id varchar(100) NOT NULL,
  phoneNumber varchar(100) NOT NULL
);

CREATE TABLE reservation (
  id SERIAL PRIMARY KEY,
  hostel_id integer,
  guest_id integer,
  date_of_arrival date,
  date_of_departure date
);

INSERT INTO
  reservation (
    hostel_id,
    guest_id,
    date_of_arrival,
    date_of_departure
  )
VALUES
  (1, 1, '04-Feb-20', '05-FEB-20');

INSERT INTO
  guest (name, hostel_id, phoneNumber)
VALUES
  ('Aysam', 1, '+972-549203843');

INSERT INTO
  hostel (
    name,
    capacity,
    description,
    contact_info,
    city_id
  )
VALUES
  (
    'Haifa Port',
    200,
    'Hostel by the water',
    '+972-54938293',
    1
  )
  ;

INSERT INTO
  city (name)
VALUES
  ('Haifa');

COMMIT;