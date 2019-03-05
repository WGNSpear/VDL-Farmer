const Discord =require("discord.js");
const fs = require("fs");
//any requirements go here
module.exports.run = async (bot, message, args) => {

    //Command code goes here
    var drugwars = require('drugwars');
    const fs = require('fs');
    var client = new drugwars.Client('wss://api.drugwars.io');
    console.log("am on");

    client.request('get_users', { maxDrugProductionRate : 1.5 }, function(err, result) {

        let uname = Math.floor((Math.random() * result.length));
        let shieldcheck = result[uname].shield_end;
        console.log(shieldcheck);
        if(shieldcheck < 1){
            message.channel.send("Heres the chosen user: https://drugwars.io/@" + result[uname].username )
    }

        console.log(result[uname]), (err) => {
            if (err) console.log(err)
        }

    message.channel.send("Heres the chosen user: https://drugwars.io/@" + result[uname].username )
})


}

module.exports.help = {
    name: "usernames" //Must rename this to name of the file
}