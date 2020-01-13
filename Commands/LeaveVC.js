var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler('leave', (Bot, msg, mes) => {Bot.leaveVC(mes.guild)});