const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require('drugwars');
const botconfig = require("../botconfig.json");

//any requirements go here
module.exports.run = async (bot, message, args) => {

    //Command code goes here
    let client = new drugwars.Client('wss://api.drugwars.io');
    console.log("am on");

    const token = botconfig.sctoken;

    client.request('login', token, function(err, result) {
        console.log('Subscribe', err, result);


        let totalAmount = "Users with no shield: \n";
        client.request('get_users', {maxDrugProductionRate: 1.5}, function (err, result) {
            for (let i = 0; i < result.length; i++) {
                let theirShield = result[i].shield_end;
                if (theirShield === 0) {
                    //message.channel.send("Heres the chosen user: https://drugwars.io/@" + result[i].username);
                    totalAmount += "https://drugwars.io/@" + result[i].username + "\n";
                    if (totalAmount.length > 1900) {
                        break;
                    }
                }
            }
            message.channel.send(totalAmount);
        });
    })

};

module.exports.help = {
    name: "usernames" //Must rename this to name of the file
};