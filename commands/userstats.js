const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require('drugwars');
var moment = require('moment');


//any requirements go here
module.exports.run = async (bot, message, args) => {

    let client = new drugwars.Client('wss://api.drugwars.io');
    let user = args[0];
    if (!user) {
        return message.channel.send("Please specify a user!")
    }
    client.request('get_user', user, function (err, result) {
        let userStats = result.user;
        let drugSpeed = (Math.floor(userStats.drug_production_rate * 3600 * 24));
        let safeDrugs = (userStats.drug_storage/4);
        let alcoholSpeed = (Math.floor(userStats.alcohol_production_rate * 3600 * 24));
        let safeAlcohol = (userStats.alcohol_storage/4);
        let weaponSpeed = (Math.floor(userStats.weapon_production_rate * 3600 * 24));
        let safeWeapons = (userStats.weapon_storage/4);
        let troopsStr = "No troops!";
        let l = result.units.length;
        console.log(l);
        console.log(result);


        let updatetime = moment(result.user.last_update).format("h:mm a");


        if (l !== 0) {
            troopsStr = "";
            for(let i = 0; i < result.units.length; i++) {
                if (result.units[i].amount !== 0) {
                    let unitName = result.units[i].unit;
                    unitName = unitName.charAt(0).toUpperCase() + unitName.slice(1);
                    let unitAmount = result.units[i].amount;
                    troopsStr += unitName + ": " + unitAmount.toString() + "\n";
                }
            }
        }
        if(troopsStr === ""){
            troopsStr += "No Troops!";
        }
  //      console.log("waaaaaaaaaaaa " + troopsStr);
        let statsembed = new Discord.RichEmbed()
            .setTitle("DrugWars User Stats")
            .setDescription("User Stats for: " + user)
            .setColor("#fffff")
            .addField("Daily Drug Production: ", `${drugSpeed}`)
            .addField("Drug safe: ", `${safeDrugs}`)
            .addField("Drugs Balance", `${result.user.drugs_balance} \n *balance last updated at ${updatetime} GMT*`)
            .addBlankField()
            .addField("Daily Weapons Production: ", `${weaponSpeed}`)
            .addField("Weapon Safe: ", `${safeWeapons}`)
            .addBlankField()
            .addField("Daily Alcohol Production: ", `${alcoholSpeed}`)
            .addField("Alcohol Safe: ", `${safeAlcohol}`)
            .addBlankField()
            .addField("Troops: ", `${troopsStr}`)


      //  console.log(statsembed);
        message.channel.send(statsembed);


        /*     msg.channel.send(`https://drugwars.io/@${uname}\n
         Daily Drug Production: ${drugSpeed} - Safe: ${safeDrugs}\n
         Daily Weapons Production: ${weaponSpeed} - Safe: ${safeWeapons}\n
         Daily Alcohol Production: ${alcoholSpeed} Safe: ${safeAlcohol}`)
 */
    })
};


module.exports.help = {
    name: "userstats" //Must rename this to name of the file
};