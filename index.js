var TelegramBot = require('node-telegram-bot-api');

var token = '973150418:AAFpWeO1cQtNRQCe1IivhsBPyxEOfyHiTik';
var bot = new TelegramBot(token, {polling: true});

var notes = [];

bot.onText(/понедельник/, function (msg) {
    var userId = msg.from.id;
    bot.sendMessage(userId, 'Возле работы');
});
bot.onText(/вторник/, function (msg) {
    var userId = msg.from.id;
    bot.sendMessage(userId, 'На остановке');
});
bot.onText(/среда/, function (msg) {
    var userId = msg.from.id;
    bot.sendMessage(userId, 'Выходной');n
});
bot.onText(/четверг/, function (msg) {
    var userId = msg.from.id;
    bot.sendMessage(userId, 'Выходной');
});
bot.onText(/пятница/, function (msg) {
    var userId = msg.from.id;
    bot.sendMessage(userId, 'Выходной');
});




