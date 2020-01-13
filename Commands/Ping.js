var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler('ping', (Bot, msg, mes) => {mes.channel.send('pong')});