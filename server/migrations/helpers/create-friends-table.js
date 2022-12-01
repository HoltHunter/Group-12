module.exports = `
    CREATE TABLE friends (
        id serial primary key not null,
        user_id integer,
        other_user_id integer,
        date_created timestamptz not null default CURRENT_TIMESTAMP
    );
`
