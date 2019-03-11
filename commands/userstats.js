const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require('drugwars');
var moment = require('moment');
const botconfig = require("../botconfig.json");

//any requirements go here
module.exports.run = async (bot, message, args) => {

    let client = new drugwars.Client('wss://api.drugwars.io');
    let user = args[0];
    if (!user) {
        return message.channel.send("Please specify a user!")
    }

    const token = botconfig.sctoken;
    client.request('login', token, function(err, result) {
        console.log('Subscribe', err, result);

     //   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJkcnVnd2Fycy5hcHAiLCJ1c2VyIjoibWVvd2dhbiIsInNjb3BlIjpbXSwiaWF0IjoxNTUxOTkwNDgwLCJleHAiOjE1NTI1OTUyODB9.hrGubKXbOUQVB4QfX1aTL9dy5xSc7m5ilmPcq_IPkOA


    client.request('get_user', user, function (err, result) {
        console.log(err);
        if(err === `Unable to get user "${user}"`){
            return message.channel.send("Cannot find User!")
        }
        let userStats = result.user;
        console.log(userStats);
        let drugSpeed = (Math.floor(userStats.drug_production_rate * 3600 * 24));
        let safeDrugs = (userStats.drug_storage/4);
        let alcoholSpeed = (Math.floor(userStats.alcohol_production_rate * 3600 * 24));
        let safeAlcohol = (userStats.alcohol_storage/4);
        let weaponSpeed = (Math.floor(userStats.weapon_production_rate * 3600 * 24));
        let safeWeapons = (userStats.weapon_storage/4);
        let thumbnail = "https://steemitimages.com/u/" + result.user.username + "/avatar";

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
            .setDescription("User Stats for: **" + user + "**\n https://drugwars.io/@" + user)
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


        /*     msg.channel.send(`https://drugwars.io/@${uname}\n
         Daily Drug Production: ${drugSpeed} - Safe: ${safeDrugs}\n
         Daily Weapons Production: ${weaponSpeed} - Safe: ${safeWeapons}\n
         Daily Alcohol Production: ${alcoholSpeed} Safe: ${safeAlcohol}`)
 */
    })
 });
  //  const token = '5KakJnNuJoJfRrqCRE8EjP6cuXdmFLTBC3y9XakhbzY7CJquzBcs';
  //  client.request('login', token, function(err, result) {
//        console.log('Subscribe', err, result);
  //  });

};


module.exports.help = {
    name: "userstats" //Must rename this to name of the file
};