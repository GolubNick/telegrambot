'use strict';

let TelegramBot = require('node-telegram-bot-api');

let token = '973150418:AAFpWeO1cQtNRQCe1IivhsBPyxEOfyHiTik';
let bot = new TelegramBot(token, {polling: true});
let users  = [{name: 'Alex', id : '55033367', day: ''}];

const arrWeek = [
    {name: 'monday', place_time: 'Магазин в 9:35'},
    {name: 'tuesday', place_time: 'Магазин в 9:35'},
    {name: 'wednesday', place_time: 'Магазин в 9:35'},
    {name: 'thursday', place_time: 'Высоцкого в 9:30'},
    {name: 'friday', place_time: 'Высоцкого в 9:30'}
];

let arrButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '+', callback_data: 'positive'}, {text: '-', callback_data: 'negative'}]
        ]
    })
};


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
    let day;
    let answer = msg.data;
    let userId = msg.from.id;
    console.log(answer);
    arrWeek.forEach(x => {
        if ((x.name).includes(answer)) {
            day = x.name;
            console.log(day);
            bot.sendMessage(userId, x.place_time);
            bot.sendMessage(userId, 'Подтвердите выше присутствие', arrButtons);
        }
    });
    if (answer === 'positive') {
        bot.sendMessage(userId, 'Спасибо, ожидаем вас.');
        bot.sendMessage('1019762042', `${userId} будет в ${day}`);
    } else if (answer === 'negative') {
        bot.sendMessage(userId, 'Спасибо, что воспользовались ботом.');
    }
});
