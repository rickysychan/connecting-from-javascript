const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

searchTerm = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people \
      WHERE famous_people.first_name LIKE $1 \
      OR famous_people.last_name LIKE $1", [searchTerm], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rowCount} person(s) by the name '${searchTerm}'`);
    result.rows.forEach(person => {
      console.log(`${person.id}: ${person.first_name} ${person.last_name} born ${person.birthdate.toDateString()}` );
    })
    client.end();
  });
  console.log('searching ...');
});