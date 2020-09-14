// Just an idea, not sure of implementation.
function DataSource()
{
	this.connection = null;

	const mysql = require('mysql');
	const connection = mysql.createConnection({
		host:     'localhost',
		user:     'root',
		password: 'root',
		database: 'incremen_crm',
		port:     '/opt/local/var/run/mysql57/mysqld.sock'
	});

	if (!this.connection)
	{
		connection.connect((error) => {
			if (error)
			{
				throw error;
			}

			this.connection = connection;
		}).bind(this);
	}
}
