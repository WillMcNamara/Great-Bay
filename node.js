var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "great_bay"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
})

function afterConnection(){
    connection.query("")
}

//connects
//prompt user to pick post or bid

//if post then prompt name of item, starting bid
    //push item to database, consolelog 'item posted'

//if bid, pick item from list, then ask for bid
    //if > highbid, update highbid, consolelog 'new highbid'
    //else consolelog 'bid not high enough'