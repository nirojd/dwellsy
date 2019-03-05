const fs = require('fs');

const Property = {
  getAllProperties: (params, callback) => {
  	const query = "SELECT * FROM `properties` ORDER BY propertyId ASC"; // query database to get all the properties
  	// execute query
  	db.query(query, (err, result) => {
  		if (err) {
		  callback(err);
		  return;
		}
		callback(null, result);
  	});
  },
  getPropertyById: (params, callback) => {
	// TODO make the SQL query attack safe by escaping the parameter or using a prepared statement 
  	const query = "SELECT * FROM `properties` WHERE propertyId = '" + params.id + "'"; // query database to get a property
  	// execute query
  	db.query(query, (err, result) => {
  		if (err) {
			callback(err);
			return;
		}
  		callback(null, result[0]);
  	});
  },
	addProperty: (params, callback) => {
		// TODO make the SQL query attack safe by escaping the parameter or using a prepared statement 
		const houseNumber = params.house_number;
		const street = params.street;
		const unitNumber = params.unitNumber;
		const city = params.city;
		const state = params.state;
		const postalCode = params.postalCode;
		const bedroomNumber = params.bedroomNumber;  		
		// TODO: change hard coded owner to real owner
		const query = "INSERT INTO `properties` (houseNumber, street, unitNumber, city, state, postalCode, bedroomNumber, claimedBy) VALUES ('" +
			houseNumber + "', '" + street + "', '" + unitNumber + "', '" + city + "', '" + state + "', '" + postalCode + "', '" + bedroomNumber + "', 1)";
		db.query(query, (err, result) => {
			if (err) {
				callback(err);
				return;
			}
			callback(null, result[0]);
		});
  	},
  	updateProperty: (params, data, callback) => {
  		const propertyId = params.id;
  		const houseNumber = data.houseNumber;
  		const street = data.street;
  		const unitNumber = data.unitNumber;
  		const city = data.city;
  		const state = data.state;
  		const postalCode = data.postalCode;
  		const bedroomNumber = data.bedroomNumber;

  		const query = "UPDATE `properties` SET `houseNumber` = '" + houseNumber + "', `street` = '" + street + "', `unitNumber` = '" + unitNumber + "', `city` = '" + city + "', `state` = '" + state + "', `postalCode` = '" + postalCode + "', `bedroomNumber` = '" + bedroomNumber + "' WHERE `properties`.`propertyId` = '" + propertyId + "'";
  		db.query(query, (err, result) => {
  			if (err) {
				callback(err);
  				return ;
  			}
  			callback(null, result);
  		});
  	},
  	deleteProperty: (params, callback) => {
  		const propertyId = params.id;
  		const getImageQuery = 'SELECT image from `properties` WHERE propertyId = "' + propertyId + '"';
  		const deleteQuery = 'DELETE FROM properties WHERE propertyId = "' + propertyId + '"';

  		// TODO: deleting associated media could work something like this:
  		// db.query(getImageQuery, (err, result) => {
  		//     if (err) {
  		//         return res.status(500).send(err);
  		//     }

  		//     const image = result[0].image;

  		//     fs.unlink(`public/assets/img/${image}`, (err) => {
  		//         if (err) {
  		//             return res.status(500).send(err);
  		//         }
  		db.query(deleteQuery, (err, result) => {
  			if (err) {
  				callback(err);
  				return;
  			}
  			callback(null, result);
  		});
  		//         });
  		//     });
	  }
};

module.exports = Property;
