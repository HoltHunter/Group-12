module.exports = `
    CREATE TABLE friend_requests (
        id serial primary key not null,
        user_id integer,
        request_from_id integer,
        decision boolean,
        date_created timestamptz not null default CURRENT_TIMESTAMP,
        date_modified timestamptz,
        constraint fk_tests_students
            foreign key (user_id) REFERENCES users (id),
            foreign key (request_from_id) REFERENCES users (id)
    );
`
