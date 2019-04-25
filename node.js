var mysql = require("mysql");
var inquirer = require("inquirer");

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
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to POST or BID?",
            choices: ["POST", "BID"],
            name: "postBid"
        }
    ]).then(function(res){
        if (res.postBid === "POST"){
            post();
        }
        else{
            bid();
        }
    })
}

function post(){
    inquirer.prompt([
        {
            message: "Name of item?",
            name: "name"
        },
        {
            message: "Starting bid?",
            name: "startingBid",
            validate: function(value){
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(res){
        connection.query("INSERT INTO items SET ?"),
        {
            name: res.name,
            high_bid: res.startingBid
        }
        console.log("New item added!");
    })
}

//connects
//prompt user to pick post or bid

//if post then prompt name of item, starting bid
    //push item to database, consolelog 'item posted'

//if bid, pick item from list, then ask for bid
    //if > highbid, update highbid, consolelog 'new highbid'
    //else consolelog 'bid not high enough'

    