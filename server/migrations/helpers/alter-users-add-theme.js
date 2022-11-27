module.exports = `
    ALTER TABLE users
    ADD COLUMN theme varchar(20) default 'classic'
    ;
`