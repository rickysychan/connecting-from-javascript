
  function(searchItem){
    client.query("SELECT famous_people.first_name FROM famous_people WHERE famous_people.first_name like searchItem"),
    console.log('Searching ...')
    }