module.exports = `
    ALTER TABLE users
    ADD COLUMN profile_icon varchar(20) default 'alpha'
    ;
`
