module.exports = `
    CREATE TABLE users (
        id serial primary key not null,
        first_name varchar(20) not null,
        last_name varchar(20) not null,
        username varchar(50) not null,
        password varchar(50) not null,
        date_created timestamptz not null default CURRENT_TIMESTAMP,
        date_modified timestamptz
    );
`