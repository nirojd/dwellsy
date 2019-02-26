const fs = require('fs');

module.exports = {
    addPropertyPage: (req, res) => {
        res.render('add-property.ejs', {
            title: 'Welcome to Dwellsy | Add a new property',
            message: ''
        });
    },
    addProperty: (req, res) => {
        const houseNumber = req.body.house_number;
        const street = req.body.street;
        const unitNumber = req.body.unitNumber;
        const city = req.body.city;
        const state = req.body.state;
        const postalCode = req.body.postal_code;
        const bedroomNumber = req.body.bedroom_number;

        // send the property details to the database
        // TODO: change hard coded owner to real owner
        const query = "INSERT INTO `properties` (houseNumber, street, unitNumber, city, state, postalCode, bedroomNumber, claimedBy) VALUES ('" +
            houseNumber + "', '" + street + "', '" + unitNumber + "', '" + city + "', '" + state + "', '" + postalCode + "', '" + bedroomNumber + "', 1)";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editPropertyPage: (req, res) => {
        const propertyId = req.params.id;
        const query = "SELECT * FROM `properties` WHERE propertyId = '" + propertyId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-property.ejs', {
                title: 'Edit Property',
                property: result[0],
                message: ''
            });
        });
    },
    editProperty: (req, res) => {
        const propertyId = req.params.id;
        const houseNumber = req.body.house_number;
        const street = req.body.street;
        const unitNumber = req.body.unitNumber;
        const city = req.body.city;
        const state = req.body.state;
        const postalCode = req.body.postal_code;
        const bedroomNumber = req.body.bedroom_number;

        const query = "UPDATE `properties` SET `houseNumber` = '" + houseNumber + "', `street` = '" + street + "', `unitNumber` = '" + unitNumber + "', `city` = '" + city + "', `state` = '" + state + "', `postalCode` = '" + postalCode + "', `bedroomNumber` = '" + bedroomNumber + "' WHERE `properties`.`propertyId` = '" + propertyId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProperty: (req, res) => {
        const propertyId = req.params.id;
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
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    //         });
    //     });
    }
};