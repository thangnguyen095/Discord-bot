var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler('join', (Bot, msg, mes) => {Bot.joinVC(mes.member.voiceChannel);});