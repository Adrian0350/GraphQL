const mysql = require('mysql');
const connection = mysql.createConnection({
	host:     'localhost',
	user:     'root',
	password: 'root',
	database: 'graphql_db',
	port:     '/opt/local/var/run/mysql57/mysqld.sock'
});


connection.connect((error) => {
	if (error)
	{
		throw error;
	}

	console.log('Connected to MySQL');
});

// Make this function async OR make MySQL connection query async for this thing to work properly.
async function fetch(query_string)
{
	return new Promise((resolve, reject) => {
		try
		{
			let query   = connection.query(query_string);
			let results = [];

			query.on('result', (rows) => {
				let entity = {};
				for (field in rows)
				{
					entity[field] = rows[field];
				}

				results.push(entity);
			});

			query.on('end', () => resolve(results));
		}
		catch (error)
		{
			reject(error);
		}
	});
}

const Query = {
	goals: (parent, args, context) => {
		return fetch(`SELECT * FROM goals WHERE company_id = ${args.company_id};`)
	}
}

module.exports = { Query };
