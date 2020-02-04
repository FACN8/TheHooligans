BEGIN;

DROP TABLE IF EXISTS cities, hostels, reservation, guests;
CREATE TABLE "cities" (
  "id" Primary,
  "name" varchar(100)
);

CREATE TABLE "hostels" (
  "id" PRImary,
  "name" varchar(100),
  "capacity" integer,
  "description" varchar(100),
  "contact_info" varchar(100),
  "city_id" int
);

CREATE TABLE "guests" (
  "id" int,
  "name" varchar(100),
  "hostel_id" varchar(100),
  "phoneNumber" int
);

CREATE TABLE "reservation" (
  "id" int,
  "name" varchar(100),
  "hostel_id" int,
  "guests_id" int,
  "date_of_arrival" date,
  "date_of_departure" date
);

COMMIT;