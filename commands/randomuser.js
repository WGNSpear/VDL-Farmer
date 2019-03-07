const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require('drugwars');
var moment = require('moment');
//any requirements go here
module.exports.run = async (bot, message, args) => {

    let uname = "";
    let client = new drugwars.Client('wss://api.drugwars.io');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJkcnVnd2Fycy5hcHAiLCJ1c2VyIjoid2duc3BlYXIiLCJzY29wZSI6W10sImlhdCI6MTU1MTk5MzA2MCwiZXhwIjoxNTUyNTk3ODYwfQ.eSthvEerbSTsX7zwGE1Pgv-454cZ9bRm45wNWdteQYk';
    client.request('login', token, function(err, result) {


        client.request('get_users', {maxDrugProductionRate: 3}, function (err, result) {
            console.log("USERS MULTIPLE", result);

            for (let i = 0; i < Math.floor((Math.random() * result.length)); i++) {
                let theirShield = result[i].shield_end;
                if (theirShield === 0) {
                    //message.channel.send("Heres the chosen user: https://drugwars.io/@" + result[i].username);
                    let user = Math.floor((Math.random() * result[i].length));
                    console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", result.length)
                    console.log(user)
                    uname += (result[i].username);
                    break;
                }
            }
        });

        setTimeout(function(){

        console.log("waaaaaaaaaa", uname);
        client.request('get_user', `${uname}`, function(err, result) {
            console.log(err);
            if(err === `Unable to get user "${user}"`){
                return message.channel.send("Cannot find User!")
            }
            let userStats = result.user;
            console.log(userStats);
            let drugSpeed = (Math.floor(userStats.drug_production_rate * 3600 * 24));
            let safeDrugs = (userStats.drug_storage / 4);
            let alcoholSpeed = (Math.floor(userStats.alcohol_production_rate * 3600 * 24));
            let safeAlcohol = (userStats.alcohol_storage / 4);
            let weaponSpeed = (Math.floor(userStats.weapon_production_rate * 3600 * 24));
            let safeWeapons = (userStats.weapon_storage / 4);
            let thumbnail = "https://steemitimages.com/u/" + result.user.username + "/avatar";

            let troopsStr = "No troops!";
            let l = result.units.length;
            console.log(l);
            console.log(result);


            let updatetime = moment(result.user.last_update).format("h:mm a");


            if (l !== 0) {
                troopsStr = "";
                for (let i = 0; i < result.units.length; i++) {
                    if (result.units[i].amount !== 0) {
                        let unitName = result.units[i].unit;
                        unitName = unitName.charAt(0).toUpperCase() + unitName.slice(1);
                        let unitAmount = result.units[i].amount;
                        troopsStr += unitName + ": " + unitAmount.toString() + "\n";
                    }
                }
            }
            if (troopsStr === "") {
                troopsStr += "No Troops!";
            }
            //      console.log("waaaaaaaaaaaa " + troopsStr);
            let statsembed = new Discord.RichEmbed()
                .setTitle("DrugWars User Stats")
                .setDescription("User Stats for: **" + result.user.username + "**\n https://drugwars.io/@" + result.user.username)
                .setColor("#fffff")
                .setThumbnail(thumbnail)
                .addField("Daily Drugs Production: ", `${drugSpeed}`)
                .addField("Drugs safe: ", `${safeDrugs}`)
                .addField("Drugs Balance", `${result.user.drugs_balance} \n *balance last updated at ${updatetime} GMT* \n ------------------------------------- `)
                .addField("Daily Weapons Production: ", `${weaponSpeed}`)
                .addField("Weapons Safe: ", `${safeWeapons}  `)
                .addField("Weapons Balance: ", `${result.user.weapons_balance} \n *balance last updated at ${updatetime} GMT* \n -------------------------------------`)
                .addField("Daily Alcohol Production: ", `${alcoholSpeed}`)
                .addField("Alcohol Safe: ", `${safeAlcohol} `)
                .addField("Alcohol Balance", `${result.user.alcohols_balance} \n *balance last updated at ${updatetime} GMT* \n -------------------------------------`)
                .addField("Troops: ", `${troopsStr}`)


            //  console.log(statsembed);
            message.channel.send(statsembed);

        })
        }, 2000);
    })

}

module.exports.help = {
    name: "randomuser" //Must rename this to name of the file
}