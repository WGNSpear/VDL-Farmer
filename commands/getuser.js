const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require("drugwars");
const client = new drugwars.Client('wss://api.drugwars.io');
const botconfig = require("../botconfig.json");
const token = botconfig.sctoken;
let rannum = Math.floor((Math.random() * 100) + 1);
var moment = require('moment');

module.exports.run = async (bot, message, args) => {

        client.request('login', token, function(err, result) {
            console.log(err, result);
          client.request('get_users', { maxDrugProductionRate: rannum }, function(err, result) {
              console.log(err, result);  
             let user = Math.floor((Math.random() * result.length));
            let uname = (result[user].username);
            client.request('get_user', `${uname}`, function(err, result){
                console.log(err, result);
                let userStats = result.user;
                let drugSpeed = (Math.floor(userStats.drug_production_rate * 3600 * 24));
                let safeDrugs = (userStats.drug_storage/4);
                let alcoholSpeed = (Math.floor(userStats.alcohol_production_rate * 3600 * 24));
                let safeAlcohol = (userStats.alcohol_storage/4);
                let weaponSpeed = (Math.floor(userStats.weapon_production_rate * 3600 * 24));
                let safeWeapons = (userStats.weapon_storage/4);
                let troops = result.units;
                let troopsStr = "No troops!";
                let l = troops.length;
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
                };
                let thumbnail = "https://steemitimages.com/u/" + result.user.username + "/avatar";
                let updatetime = moment(result.user.last_update).format("h:mm a");
                let statsembed = new Discord.RichEmbed()
                    .setTitle("DrugWars User Stats")
                    .setDescription("User Stats for: **" + uname + "**\n https://drugwars.io/@" + uname)
                    .setColor("#fffff")
                    .setThumbnail(thumbnail)
                    .addField("Daily Drugs Production: ", `${drugSpeed}`)
                    .addField("Drugs safe: ", `${safeDrugs}`)
                    .addField("Drugs Balance", `${result.user.drugs_balance} \n *balance last updated at ${updatetime} UTC* \n ------------------------------------- `)
                    .addField("Daily Weapons Production: ", `${weaponSpeed}`)
                    .addField("Weapons Safe: ", `${safeWeapons}  `)
                    .addField("Weapons Balance: ", `${result.user.weapons_balance} \n *balance last updated at ${updatetime} UTC* \n -------------------------------------`)
                    .addField("Daily Alcohol Production: ", `${alcoholSpeed}`)
                    .addField("Alcohol Safe: ", `${safeAlcohol} `)
                    .addField("Alcohol Balance", `${result.user.alcohols_balance} \n *balance last updated at ${updatetime} UTC* \n -------------------------------------`)
                    .addField("Troops: ", `${troopsStr}`)


                //  console.log(statsembed);
                message.channel.send(statsembed);
    });
});
});

};

module.exports.help = {
    name: "getuser"
}