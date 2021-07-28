const { Telegraf } = require('telegraf')
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')
const bot = new Telegraf('1720769276:AAHWkCEeeg6z5luxux3kNtMTWgcQq7GsqF4')
var express = require('express')
var port = process.env.PORT || 80;
var app = express()

const { Keyboard, Key } = require('telegram-keyboard')

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id,
      'Добро пожаловать в бот, вот что он умеет: \n'+
      '/menu - меню приложения', {
    })
})


bot.command('menu', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Меню', {

      reply_markup: {
                  resize_keyboard : true,
                  keyboard: [

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
                              callback_data: 'balance'
                          },
                          {
                              text: "📈 Статистика",
                              callback_data: 'stat'
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

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
