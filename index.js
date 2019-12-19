'use strict';

let TelegramBot = require('node-telegram-bot-api');

let token = '973150418:AAFpWeO1cQtNRQCe1IivhsBPyxEOfyHiTik';
let bot = new TelegramBot(token, {polling: true});
// let users  = [{name: 'Alex', id : '55033367', day: ''}];
let users  = [];
let flag = false;

const arrWeek = [
    {name: 'monday', place_time: 'Магазин в 9:35'},
    {name: 'tuesday', place_time: 'Магазин в 9:35'},
    {name: 'wednesday', place_time: 'Магазин в 9:35'},
    {name: 'thursday', place_time: 'Высоцкого в 9:30'},
    {name: 'friday', place_time: 'Магазин в 9:35'}
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

bot.on('message', function (msg) {
    let userId = msg.from.id;
    if (msg.text === '/week'){
        let user = users.filter(w => w.id === userId)[0];
        if (user){
            bot.sendMessage(userId, `Добрый день`);
            msg.text = user.name;
            selectDay(msg, true);
        } else {
            flag = true;
            bot.sendMessage(userId, 'Добрый день назовите ваше имя пожалуйста');
        }
    } else {
        selectDay(msg, flag);
    }
});

bot.on('callback_query', function (msg) {
    let answer = msg.data;
    let userId = msg.from.id;
    arrWeek.forEach(x => {
        if ((x.name).includes(answer)) {
            let user = users.filter(w => w.id === userId)[0];
            user.day = x.name;
            bot.sendMessage(userId, x.place_time);
            bot.sendMessage(userId, 'Подтвердите выше присутствие', arrButtons);
        }
    });
    if (answer === 'positive') {
        let user = users.filter(w => w.id === userId)[0];
        bot.sendMessage(userId, 'Спасибо, ожидаем вас.');
        bot.sendMessage('1019762042', `${user.name} будет в ${user.day}`);
    } else if (answer === 'negative') {
        bot.sendMessage(userId, 'Спасибо, что воспользовались ботом.');
    }
});

function selectDay(msg, isWeek) {
    if (isWeek) {
        let userName = msg.text;
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
        let user = users.filter(w => w.id === userId)[0];
        if (!user) {
            users.push({name: userName, id: userId})
        }
        flag = false;
        bot.sendMessage(userId, `${userName} выберите день недели:`, options);
    }
}
