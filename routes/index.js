module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `properties` ORDER BY propertyId ASC"; // query database to get all the properties

    // execute query
    db.query(query, (err, result) => {
      console.log(result);
      if (err) {
        res.redirect('/');
      }
      res.render('index.ejs', {
        title: 'Welcome to Dwellsy | View Properties',
        properties: result
      });
    });
  },
};