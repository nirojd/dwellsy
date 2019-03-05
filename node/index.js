/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const mysql = require('mysql');
const restifyPlugins = require('restify-plugins');

/**
  * Initialize Server
  */
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
	// create connection to database
	// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
	const db = mysql.createConnection(config.db);

	// connect to database
	db.connect((err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		require('./routes')(server);
		console.log(`Server is listening on port ${config.port}`);
	});
	global.db = db;

});
