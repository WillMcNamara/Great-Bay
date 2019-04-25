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
        connection.query("INSERT INTO items SET ?",
        {
            name: res.name,
            high_bid: res.startingBid
        })
        console.log("New item added!");
    })
}

function bid(){
    connection.query("SELECT * FROM items", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: "choice",
              type: "rawlist",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].name);
                }
                return choiceArray;
              },
              message: "What auction would you like to place a bid in?"
            },
            {
              name: "bid",
              type: "input",
              message: "How much would you like to bid?",
              validate: function(value){
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }
            }
          ])
          .then(function(answer) {
            connection.query("SELECT high_bid FROM items WHERE name = '" + answer.choice + "'", function(err, results){
                if (err) console.log(err);
                console.log(results[0].high_bid);
                console.log(parseInt(answer.bid));
                if (results[0].high_bid < parseInt(answer.bid)){
                    connection.query("UPDATE items SET ? WHERE ?",
                    [
                        {
                            high_bid: parseInt(answer.bid)
                        },
                        {
                            name: answer.choice
                        }
                    ],
                    function(err, res) {
                        console.log("New high bid set!");
                    })
                }
                else {
                    console.log("Bid not high enough!");
                    bid();
                }
                })
            })
    })
}

//connects
//prompt user to pick post or bid

//if post then prompt name of item, starting bid
    //push item to database, consolelog 'item posted'

//if bid, pick item from list, then ask for bid
    //if > highbid, update highbid, consolelog 'new highbid'
    //else consolelog 'bid not high enough'

    