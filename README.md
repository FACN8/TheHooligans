# TheHooligans 
By: @LogicX1 , @ayasm199 , @hadeel11 , @92yo

## Search & Book your hostel today!

---


### Topics
* [Overview](#page_with_curl-overview)
* [Installing locally](#floppy_diskpackage-installing-locally-)
* [Testing](#tada-testing)
* [Our process](#construction_worker-construction---our-process)
* [Our struggles](#hatching_chick-hatched_chick--our-struggles)
* [Learning outcomes](#chicken-learning-outcomes)
* [Limitations and future goals](#fast_forward--current-limitations-and-future-goals)

---

## :page_with_curl: Overview:
This is our week 6 porject for Webahead4.
The idea is searching and booking hostels .
 
We prcticed using Postgresql with having multiple tables , with mutliple types of connections like many to one and one to many etc ..

We Get data from the databased and also post/update the database.

You can view the website app on heroku : 
https://the-hooligans-database.herokuapp.com/


---

## :floppy_disk::package: Installing locally : 

1. clone this rep.
2. cd into the cloned rep.
3. In the terminal run: npm i
4. In the terminal run: npm start
5. The server is now running at localhost:5000
6. Open localhost:5000 in your browser!

---


# :tada: Testing:
If you want to run the tests you need to set up a testing database.
Requirements:(Available also as devdependencies in package.json)
have the following node packages installed:
-Psql or pgcli
-Tape
-Supertest
-Jest
You can run "npm i" in the terminal.

---

1. Create testing db.
   - In your terminal start psql or pgcli.

In terminal,Enter the following:
- CREATE DATABASE testhosteldb;
You can create a user or skip and use existing user.
- CREATE USER [user_name] WITH SUPERUSER PASSWORD ['password'];

- ALTER DATABASE testhosteldb OWNER TO [user_name];

---

2. In your .env file add this :
   `TEST_DB_URL = postgres://[user_name]:[password]@localhost:5432/[db_name]`
   replace the [user_name] , [password] , [db_name] with your own.

## Test database set!

---


## :construction_worker: :construction:   Our process

We picked and ideas and discussed them until we decided on one : Search and book hostels
1. First thing was planning our database, we drawed on the board and implemented the schema on dbdiagram.io .
2. After that we decided how the file structure will be like and built that and pushed it to our repo.
3. divided the work that everyone will work on seperate file such as server-side,front-end,database ..
4. worked with pgcli to create the database and test the queries and when everything was working we moved to implement those in our code.
5. Wrote tests to test our database.
6. The entire time we push any meaningful change we do and merge and try to all work on the same files.
7. The coding never ends but the deadend is sure to arrive, last little bug fixes after code review.

---

## :hatching_chick: :hatched_chick:  Our struggles
 
Using sql turned out to be harder than expected we had some struggle with things such as : 
- Planning how all the connections will work before imeplenting anything.
- Creating complex queries .
- Creating dynamic queries with table/column being dynamic, for that we used pg-format node package.
- Heroku didn't run because of some packages being dev packages.

---

## :chicken: Learning outcomes
 
- Setting up a database loclly and on heroku.
- Connecting to databases from our app.
- Sending queries to the database.
- Getting data and updating data on the database.
- What are the results of a query.
- Setting up env variables on heroku.
- Having dotenv not as a dev dependency for heroku.

---

## :fast_forward:  Current limitations and future goals
### Limitations:
- The app works for the current month, and for the next one we need to setup the reservation table again.
- No real source of data about hostels and cties , its all hard coded.

### Future goals

- Work for any date.
- Have real Data from real apis about cities and hostels .
