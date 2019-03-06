const Discord =require("discord.js");
const fs = require("fs");
//any requirements go here
module.exports.run = async (bot, message, args) => {

    var drugwars = require('drugwars');
    const fs = require('fs');
    var client = new drugwars.Client('wss://api.drugwars.io');

    let user = args[0];
    if (!user) {
        return message.channel.send("Please specify a user!")
    }
    let oneunit = "Users units: \n";
    client.request('get_user', user, function (err, result) {
        //  console.log(result)
        //  message.channel.send("unit " + result.unit)
    //    message.channel.send("yes")
        let userStats = result.user;
        let drugSpeed = (Math.floor(userStats.drug_production_rate * 3600 * 24));
        let safeDrugs = (userStats.drug_storage/4);
        let alcoholSpeed = (Math.floor(userStats.alcohol_production_rate * 3600 * 24));
        let safeAlcohol = (userStats.alcohol_storage/4);
        let weaponSpeed = (Math.floor(userStats.weapon_production_rate * 3600 * 24));
        let safeWeapons = (userStats.weapon_storage/4);
        let troops = result.units;
            console.log(troops);
        let unit0Type = troops[0].unit;
        console.log(unit0Type);
        let unit0Amount = troops[0].amount;
        let unit1Type = troops[1].unit;
        let unit1Amount = troops[1].amount;
        let unit2Type = troops[2].unit;
        let unit2Amount = troops[2].amount;
        let unit3Type = troops[3].unit;
        let unit3Amount = troops[3].amount;
        let unit4Type = troops[4].unit;
        let unit4Amount = troops[4].amount;
        let unit5Type = troops[5].unit;
        let unit5Amount = troops[5].amount;
        let unit6Type = troops[6].unit;
        let unit6Amount = troops[6].amount;
        let unit7Type = troops[7].unit;
        let unit7Amount = troops[7].amount;
        let unit8Type = troops[8].unit;
        let unit8Amount  = troops[8].amount;
        let unit9Type = troops[9].unit;
        let unit9Amount = troops[9].amount;




            let statsembed = new Discord.RichEmbed()
                .setTitle("DrugWars User Stats")
                .setDescription("User Stats for: " + user)
                .setColor("#fffff")
                .addField("Daily Drug Production: ", `${drugSpeed}`)
                .addField("Drug safe: ", `${safeDrugs}`)
                .addField("Daily Weapons Production: ", `${weaponSpeed}`)
                .addField("Weapon Safe: ", `${safeWeapons}`)
                .addField("Daily Alcohol Production: ", `${alcoholSpeed}`)
                .addField("Alcohol Safe: ", `${safeAlcohol}`);

                message.channel.send(statsembed)


       /*     msg.channel.send(`https://drugwars.io/@${uname}\n
        Daily Drug Production: ${drugSpeed} - Safe: ${safeDrugs}\n
        Daily Weapons Production: ${weaponSpeed} - Safe: ${safeWeapons}\n
        Daily Alcohol Production: ${alcoholSpeed} Safe: ${safeAlcohol}`)
*/
    })
}


module.exports.help = {
    name: "userstats" //Must rename this to name of the file
}