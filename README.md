### Web Application for internal use


#### Postgresql migrations
	
TODO: write script for handling database migrations

This functionality will be handled with build script call in package.json.

migration script:
- get info from config
- check db connectivity
	- yes: proceed
	- no: abort and report error 
- check if database exists
	- yes: warn user
	- no: create database from latest schema with dummy info
			
Documentation
	
	$ pg_dump -s databasename
	$ psql databasename < data_base_dump