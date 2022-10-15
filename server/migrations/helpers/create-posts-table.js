module.exports = `
    CREATE TABLE posts (
        id serial primary key not null,
        date_created timestamptz not null default CURRENT_TIMESTAMP,
        date_modified timestamptz,
        user_id integer,
        content varchar,
        likes_count integer,
        CONSTRAINT fk_posts_users
            FOREIGN KEY (user_id) REFERENCES users (id)
    );
`
