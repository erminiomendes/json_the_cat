const request = require('request');


const fetchBreedDescription = (breedName, callback) => {
  request(`https://api.thecatapi.com/v1/breeds/search/?q=${breedName}`, (err, response, body) => {
    //console.log("responseCode: ", response.statusCode); 
    if (err || response.statusCode === 404) {
      callback(`There has been an error: 
        Response: ${response.statusCode}
        Error: ${err}`, null); // passinto callback error message and null description value

    }

    //parse into JSON object
    const data = JSON.parse(body);
    //console.log(data[0].weight);
    // console.log(typeof data);
    // console.log(data[0]);

    //if no data returned by search, inform user
    if (!data[0] && data[0].length === 0) {
      // pass message to error, null description
      callback(`No results found: ${breedName}.`, null);

      // pass null to error, description to results
    } else if (data[0].description) {
      callback(null, data[0].description);
    }
  });
};

module.exports = { fetchBreedDescription };