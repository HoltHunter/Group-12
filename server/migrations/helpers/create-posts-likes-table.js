module.exports = `
    CREATE TABLE post_likes (
        user_id integer,
        post_id integer,
        constraint fk_likes_posts
            foreign key (user_id) REFERENCES users (id),
            foreign key (post_id) REFERENCES posts (id)
    );
`
