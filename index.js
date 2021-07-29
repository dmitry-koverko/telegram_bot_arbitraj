const { Telegraf } = require('telegraf')
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')
const db = require('./db')
//const bot = new Telegraf('1720769276:AAHWkCEeeg6z5luxux3kNtMTWgcQq7GsqF4') //release
const bot = new Telegraf('1915110771:AAEwzJreBi5HvMqzo2x_G2TczcEj24ZA2e0') // test
var express = require('express')
var port = process.env.PORT || 80;
var app = express()

const { Keyboard, Key } = require('telegram-keyboard')

bot.command('start', function(ctx) {
    bot.telegram.sendMessage(ctx.chat.id,
      ctx.from.username + ', Добро пожаловать в бот, вот что он умеет: \n'+
      '/menu - меню приложения', {
    })

    // (async () => {
    //   var uid = ctx.from.username
    //   var a = await db.createUser(ctx.from.id, ctx.from.username)
    // })
})

bot.on('callback_query', query => {
    console.log(query);

    switch (query.data) {
      case 'balance':
          console.log("balance");
          break;

        }
});

bot.command('balance', function(ctx) {
    bot.telegram.sendMessage(ctx.chat.id,
      'balance', {
    })

    // (async () => {
    //   var uid = ctx.from.username
    //   var a = await db.createUser(ctx.from.id, ctx.from.username)
    // })
})

// bot.on('text', (ctx) => {
//   ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
// })

// bot.on('callback_query', (ctx) => {
//   // Explicit usage
//   ctx.telegram.answerCbQuery(ctx.callbackQuery.id)
//
//   // Using context shortcut
//   ctx.answerCbQuery()
// })

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
    // 'callbackQuery' is of type CallbackQuery
    console.log("query: ",callbackQuery);
});

// bot.on('inline_query', (ctx) => {
//   const result = []
//   console.log("query: ",callbackQuery);
//   // Explicit usage
//   ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)
//
//   // Using context shortcut
//   ctx.answerInlineQuery(result)
// })

// bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//   const action = callbackQuery.data;
//   const msg = callbackQuery.message;
//   const opts = {
//     chat_id: msg.chat.id,
//     message_id: msg.message_id,
//   };
//   let text;
//
//   if (action === 'balance') {
//     text = 'You hit button 1';
//   }
//
//   bot.editMessageText(text, opts);
// });

bot.command('menu', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Меню', {

      reply_markup: {
                  resize_keyboard : true,
                  inline_keyboard: [

                      [{
                              text: "💸 Прилы",
                              callback_data: 'balance'
                          },
                          {
                              text: "📈 Цены",
                              callback_data: 'stat'
                          }
                      ],
                      [{
                              text: "💸 Баланс",
                              callback_data: 'balance2'
                          },
                          {
                              text: "📈 Статистика",
                              callback_data: 'sta1t'
                          },
                          {
                              text: "📋 FAQ",
                              callback_data: 'faq'
                          }
                      ],

                  ]
              }

    })
})

bot.launch()

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
