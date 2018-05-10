var CommandHandler = require('./CommandHandler');

module.exports = new CommandHandler('ping', (mes) => {mes.channel.send('pong')});