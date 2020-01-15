const Discord = require('discord.js');
const Bot = require('./Bot');
const PingCommand = require('./Commands/Ping');
const JoinVCCommand = require('./Commands/JoinVC');
const LeaveVCCommand = require('./Commands/LeaveVC');
const PlayYoutubeCommand = require('./Commands/youtubeMusic');

const client = new Discord.Client();
const config = require('./configbot/botconfig.json');

const bot = new Bot(client, config);

bot.attachCommand(new PingCommand());
bot.attachCommand(new JoinVCCommand());
bot.attachCommand(new LeaveVCCommand());
bot.attachCommand(new PlayYoutubeCommand());

