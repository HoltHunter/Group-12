module.exports = `
	CREATE FUNCTION update_date_modified() RETURNS trigger AS $$
	BEGIN
		NEW.date_modified := NOW();

		RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;
`
