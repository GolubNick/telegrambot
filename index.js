let TelegramBot = require('node-telegram-bot-api');

let token = '973150418:AAFpWeO1cQtNRQCe1IivhsBPyxEOfyHiTik';
let bot = new TelegramBot(token, {polling: true});

const arrWeek = [
    {name: 'monday', place_time: 'высоцкого 9:30'},
    {name: 'tuesday', place_time: 'магазин 9:35'},
    {name: 'wednesday', place_time: 'магазин 9:35'},
    {name: 'thursday', place_time: 'высоцкого 9:30'},
    {name: 'friday', place_time: 'высоцкого 9:30'}
];


bot.onText(/подписка/, function (msg) {
    let userId = msg.from.id;
    bot.sendMessage(userId, 'Вы подписались на рассылку!');
});

bot.onText(/отписка/, function (msg) {
    let userId = msg.from.id;
    bot.sendMessage(userId, 'Вы отписались от рассылку!');
});

bot.onText(/week/, function (msg, match) {
    let userId = msg.from.id;
    let options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Понедельник', callback_data: arrWeek[0].name}],
                [{text: 'Вторник', callback_data: arrWeek[1].name}],
                [{text: 'Среда', callback_data: arrWeek[2].name}],
                [{text: 'Четверг', callback_data: arrWeek[3].name}],
                [{text: 'Пятница', callback_data: arrWeek[4].name}]
            ]
        })
    };
    console.log(`userId is ${userId}`);
    bot.sendMessage(userId, 'Выберите день недели:', options);
});

bot.on('callback_query', function (msg) {
    let answer = msg.data;
    console.log(answer);
    arrWeek.forEach(x => {
        if ((x.name).includes(answer)) {
            bot.sendMessage(msg.from.id, x.place_time);
        }
    });
});




