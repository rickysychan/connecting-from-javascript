const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

searchTerm = process.argv[2];

console.log('searching ...');

  knex.select('*')
  .from('famous_people')
  .where('first_name', 'LIKE' , searchTerm)
    .orWhere('last_name', 'LIKE', searchTerm)
      .asCallback(function(err, rows) {
      if (err) return console.error(err);
      console.log(`Found ${rows.length} person(s) by the name '${searchTerm}'`);
      rows.forEach(person => {
      console.log(`${person.id}: ${person.first_name} ${person.last_name} born ${person.birthdate.toDateString()}` );
    })
      knex.destroy();
  });




