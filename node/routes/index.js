/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Property = require('../models/property');

module.exports = function(server) {

	/**
	 * POST
	 */
	server.post('/properties', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		const data = req.body || {};
		Property.addProperty(data, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}
			res.send(201);
			next();
		});
	});

	/**
	 * LIST
	 */
	server.get('/properties', (req, res, next) => {
		Property.getAllProperties(req.params, function (err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}
			res.send(docs);
			next();
		});
	});

	/**
	 * GET
	 */
	server.get('/properties/:id', (req, res, next) => {
		Property.getPropertyById({ id: req.params.id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}
			res.send(doc);
			next();
		});
	});

	/**
	 * UPDATE
	 */
	server.put('/properties/:id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};

		if (!data.id) {
			data = Object.assign({}, data, { id: req.params.id });
		}

		Property.getPropertyById({ id: req.params.id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.'
					)
				);
			}

			Property.updateProperty({ id: data.id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

	/**
	 * DELETE
	 */
	server.del('/properties/:id', (req, res, next) => {
		Property.deleteProperty({ id: req.params.id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(204);
			next();
		});
	});
};
