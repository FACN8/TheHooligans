BEGIN;

DROP TABLE IF EXISTS city, hostel, reservation, guest;
CREATE TABLE "city" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL
);

CREATE TABLE "hostel" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "capacity" integer,
  "description" varchar(100),
  "contact_info" varchar(100),
  "city_id" integer
);

CREATE TABLE "guest" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "hostel_id" varchar(100) NOT NULL,
  "phoneNumber" integer
);

CREATE TABLE "reservation" (
  "id" SERIAL PRIMARY KEY,
  "hostel_id" integer,
  "guests_id" integer,
  "date_of_arrival" date,
  "date_of_departure" date,
  "guest_id" integer
);

COMMIT;