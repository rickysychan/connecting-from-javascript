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

firstName = process.argv[2];
lastName  = process.argv[3];
bday      = process.argv[4];

knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: bday})
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  knex.destroy();
});