var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler('ping', (Bot, mes) => {mes.channel.send('pong')});