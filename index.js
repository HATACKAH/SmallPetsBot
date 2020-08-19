const TelegramBot = require('node-telegram-bot-api'); 
const token = 'Enter your bot api key'; 
const bot = new TelegramBot(token, {polling: true});


//конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Хочу котика', 
        callback_data: 'moreCats' 
      }
    ],
    [
        {
          text: 'Хочу песика',
          callback_data: 'moreDoge'
        }
    ]
  ];


bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет, Друг! Чего хочешь?', { 
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
      }
    let num = getRandomIntInclusive(1, 3);

    let img = '';

    if (query.data === 'moreCats') { //  кот
        img = 'img/cats_'+num+'.jpg';

    }

    if (query.data === 'moreDoge') { //  пёс
        img = 'img/doge_'+num+'.jpg';
    }

    if (img) {
        bot.sendPhoto(chatId, img, { 
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { 
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });