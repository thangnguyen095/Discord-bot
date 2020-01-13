var Discord = require('discord.js');
var Client = new Discord.Client();
var Bot = require('./Bot');
var Ping = require('./Commands/Ping');
var JoinVC = require('./Commands/JoinVC');
var LeaveVC = require('./Commands/LeaveVC');
var PlayYoutube = require("./Commands/youtubeMusic");
var DeleteMessage = require("./Commands/DeleteMessageInChannel");
var config = require('./botconfig.json')

var bot = new Bot(Client, config);

bot.attachCommand(Ping);
bot.attachCommand(JoinVC);
bot.attachCommand(LeaveVC);
bot.attachCommand(PlayYoutube);
bot.attachCommand(DeleteMessage);
