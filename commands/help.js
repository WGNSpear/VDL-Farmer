const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require('drugwars');
var moment = require('moment');
var pageMenu = require('@quantiom/pagemenu');
const botconfig = require("../botconfig.json");
//any requirements go here
module.exports.run = async (bot, message, args) => {

    let helpembed = new Discord.RichEmbed()
        .setTitle("<@552595906084732971> Commands")
        .setColor("#fffff")
        .setDescription("Heres a list of the available commands")
        .addField("vuserstats `username`", "This command will send a bunch of Statistics about that user. \n *Note: The balance may be incorrect due to DrugWars only updating the stat randomly throughout the day, Sorry for any inconvenience!*")
        .addField("vfstats `username`", "This command will send the specified users Fight Stats. eg Their Troops and their current defense power.")
        .addField("vusernames", "This command will send roughly 100 random usernames that do not have shields")
        .addField("vgetuser", "This command will send one compeletely random user that does not have a shield \n Their info is included, just the like the vuserstats command.")
        .setFooter("Bot made by Spear#0481 on Discord. DM Spear if you have any suggestions for the bot!")

        message.channel.send(helpembed);

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJkcnVnd2Fycy5hcHAiLCJ1c2VyIjoid2duc3BlYXIiLCJzY29wZSI6W10sImlhdCI6MTU1MjMyMjQxOCwiZXhwIjoxNTUyOTI3MjE4fQ.uQBiLs7VW1sEngkXnHslo59AvBebrKJ0vezwdWeHUe4

}

module.exports.help = {
    name: "help" //Must rename this to name of the file
};