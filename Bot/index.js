var Discord = require('discord.js');
var Client = new Discord.Client();
var Bot = require('./Bot');
var Ping = require('./Commands/Ping');
var config = require('./botconfig.json')

var bot = new Bot(Client, config);

bot.attachCommand(Ping);