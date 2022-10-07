module.exports = `
	CREATE TRIGGER
		update_date_modified
	BEFORE UPDATE ON
		friend_requests
	FOR EACH ROW EXECUTE PROCEDURE
		update_date_modified();
`