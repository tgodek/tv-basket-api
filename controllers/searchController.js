require("dotenv").config();
const MovieDB = require("node-themoviedb");

const mdb = new MovieDB(process.env.API_KEY)

//this function can probably be written much better
//right now it is using API function
/***************************************************/
//we can probably try to implement something like this ourselves
//e.g. also searching for movies, shows, people, but with priorities that
//user in frontend wants
//e.g. user searches "dicaprio" and wants that search results first respond with
//movies that star someone with dicaprio in their name, and then shows, and then people
//with this name
/***************************************************/
//check documentation https://openbase.com/js/node-themoviedb/documentation
module.exports.search = async (req, res) => {
    try {
        const args = {
            query: {
              query: req.query.query,
              page: req.query.page,
            }
          };
          const searchRes = await mdb.search.multi(args);

          res.json(searchRes);
    } catch (e) {
        res.send(e);
    }
};