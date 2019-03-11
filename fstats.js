const Discord =require("discord.js");
const fs = require("fs");
const drugwars = require('drugwars');
var moment = require('moment');
var pageMenu = require('@quantiom/pagemenu');
const botconfig = require("../botconfig.json");
//any requirements go here
module.exports.run = async (bot, message, args) => {

  //  var another = require('../Utils/stats.js');

    let client = new drugwars.Client('wss://api.drugwars.io');
    console.log("am on");
    let user = args[0];
    if (!user) {
        return message.channel.send("Please specify a user!")
    }

    const token = botconfig.sctoken;
      client.request('login', token, function(err, result) {
        console.log('Subscribe', err, result);


        client.request('get_user', user, function (err, result) {
            console.log(err);
            if(err === `Unable to get user "${user}"`){
                return message.channel.send("Cannot find User!")
            }
            let userStats = result.user;
            console.log(userStats);
            let thumbnail = "https://steemitimages.com/u/" + result.user.username + "/avatar";

            let troopsStr = "No troops!";
            let defensetotal = 0;
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

                        if(unitName === "Bouncer"){
                            defensetotal = defensetotal + (unitAmount *10);
                        }
                        if(unitName === "Rowdy"){
                            defensetotal = defensetotal + (unitAmount *2);
                        }
                        if(unitName === "Knifer"){
                            defensetotal = defensetotal + (unitAmount *5);
                        }
                        if(unitName === "Gunman"){
                            defensetotal = defensetotal + (unitAmount *12);
                        }
                        if(unitName === "Sniper"){
                            defensetotal = defensetotal + (unitAmount *8);
                        }
                        if(unitName === "Hitman"){
                            defensetotal = defensetotal + (unitAmount *15);
                        }
                        if(unitName === "Ninja"){
                            defensetotal = defensetotal + (unitAmount *20);
                        }
                        if(unitName === "Big_mama"){
                            defensetotal = defensetotal + (unitAmount *110);
                        }
                        if(unitName === "Bazooka"){
                            defensetotal = defensetotal + (unitAmount *25);
                        }
                        if(unitName === "Mercenary"){
                            defensetotal = defensetotal + (unitAmount *75);
                        }

                        troopsStr += unitName + ": " + unitAmount.toString() + "\n";
                    }
                }
            }

            if(troopsStr === ""){
                troopsStr += "No Troops!";
            }
            console.log(troopsStr)


            let pMenu = new pageMenu(message,
                [{
                    title: "Defenders Stats",
                    description: "Shows the person you want to attack's Fight Stats.",
                    //   function: function() { console.log("page 1"); }, // this function will be executed when the user goes to this page
                    thumbnail: `${thumbnail}`,
                    fields: [
                        {
                            name: "User",
                            value: user,
                            inline: false
                        },
                        {
                            name: "Troops:",
                            value: `${troopsStr}`,
                            inline: true
                        },
                        {
                            name: "Defensive Power",
                            value: `This user has a defensive power of ${defensetotal} Units`,
                            inline: true
                        }
                    ]
                },
                    { title: "Attackers Stats",
                      description: "Shows your Fight Stats",
                      thumbnail: `${thumbnail}`,
                      fields:[
                          {
                              name: "Troops:",
                              value: `WIP`,
                              inline: true
                          },
                          {
                              name: "Offensive Power",
                              value: `WIP`,
                              inline: true
                          }
                    ]
                    }

                ], {/*duration: 60000  emojis,*/ color: "#fffff", waitingText: "Loading stats!"});

            pMenu.run();

        })
    });



}

module.exports.help = {
    name: "fstats" //Must rename this to name of the file
}