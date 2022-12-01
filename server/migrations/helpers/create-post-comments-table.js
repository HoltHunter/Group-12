module.exports = `
    CREATE TABLE post_comments (
        user_id integer,
        post_id integer,
        date_created timestamptz not null default CURRENT_TIMESTAMP,
        content varchar,
        CONSTRAINT fk_comment_posts
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (post_id) REFERENCES posts (id)
    );
`
