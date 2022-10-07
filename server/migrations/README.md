## TO CREATE THE DOCKER CONTAINER, run the following command with docker running:

docker run --name postgres-cse -e POSTGRES_DB=cse_database \
  -e POSTGRES_USER=cse_username \
  -e POSTGRES_PASSWORD=cse_password \
  -p 5432:5432 -d postgres


## AFTER CREATING THE DOCKER CONTAINER, run the app

node app.js

_This will create the db based on the migrations._

## TO ACCESS THE DB:

docker exec -it postgres-cse psql -U cse_username cse_database


## TO VIEW TABLES:

\dt

## TO TEST INSERTING A RECORD:

INSERT INTO users(first_name, last_name, username, password) VALUES('John', 'Stewart', 'johnnyboy', 'passcode');

**_Note: You MUST use single quotes on the VALUES to be inserted!_**


## TO SELECT RECORDS:

_Select All:_
SELECT * FROM users;

**_Note: You MUST end every command with a semicolon!_**


## TO UPDATE RECORDS:

UPDATE users SET first_name = 'Johnathan' WHERE id = 1;

_Note: This should allow you to see the `date_modified` automatically updated by the trigger in migration 002!_

## TO EXIT:

exit