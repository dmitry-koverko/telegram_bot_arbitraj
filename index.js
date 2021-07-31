const { Telegraf } = require('telegraf')
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')
const db = require('./db')
const TOKEN = '1915110771:AAEwzJreBi5HvMqzo2x_G2TczcEj24ZA2e0'
const CURRENCY = 4.75
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN, {polling: true});
var express = require('express')
var port = process.env.PORT || 5000;
var app = express()
const { Keyboard, Key } = require('telegram-keyboard')

// bot.setMyCommands([
//   {
//     command: '/start',
//     description: 'Главное меню'
//   },
// ]);

bot.onText(/\/start/, async (msg) => {
    await generalMenu(msg)
});

async function generalMenu(msg){
  try {
    const chatId = msg.chat.id;
    var checkUser = await db.getUserById(msg.from.id)
    if(checkUser == null) {
      console.log('user no register');
      if(!await db.createUser(msg.from.id, msg.from.username)) console.log('succeess user created');
      else console.log('error user created');
    }
    else {
      //console.log('user ' + msg.from.id + ' in system');
    }
    await bot.sendMessage(chatId, '---------Меню---------',
      general_menu,
    )
    await bot.deleteMessage(chatId, msg.message_id);

  } catch (e) {
    console.log('error general');
  }
}

async function profileMenu(chatId, msg){
  await bot.sendMessage(chatId, '---------Профиль---------',
      profile_menu,
  )
  await bot.deleteMessage(chatId, msg.message_id);
}

async function appsMenu(chatId, msg){

  var appsList = await db.getAllAppsCategory()

  await bot.sendMessage(chatId, '---------Прилы---------',
    getAppsMenu(appsList),
  )
  await bot.deleteMessage(chatId, msg.message_id);
}

async function faqMenu(chatId, msg){
  await bot.sendMessage(chatId,
    '---------FAQ--------- \n' +
    'dsadasdasdasdasdasdadas',
    faq_menu,
  )
  await bot.deleteMessage(chatId, msg.message_id);
}

async function balanceMenu(chatId, msg){
  var balance = await db.getUserBalanceById(msg.from.id)
  var count = balance / CURRENCY
  //if(count.contains('.')) count = count.split('.')[0]
  await bot.sendMessage(chatId,
    '---------Баланс--------- \n'+
    'Ваш баланс: ' + balance + ' RUB\n'+
    'Количество инсталлов: ' + parseInt(count),
    balance_menu,
  )
  await bot.deleteMessage(chatId, msg.message_id);
}


bot.on('callback_query', async (query) => {
  //console.log(query);
  const chatId = query.message.chat.id;
  switch (query.data) {
    case 'profile':
      profileMenu(chatId, query.message)
      break;
    case 'apps':
      appsMenu(chatId, query.message)
      break;
    case 'faq':
      faqMenu(chatId, query.message)
      break;
    case 'back_to_general':
      generalMenu(query.message)
      break;
    case 'balance':
      balanceMenu(chatId, query.message)
      break;
    case 'back_to_profile':
      profileMenu(chatId, query.message)
      break;
    case 'app_gambling':
      await listCategoryMenu(chatId, query.message,2)
      break;
    default://

  }
})

async function listCategoryMenu(chatId, msg, type){
  var title = ''
  switch (type) {
    case 1:
      title = '-----Dating-----'
      break;
    case 2:
      title = '-----Gembling-----'
      break;
    case 3:
      title = '-----Betting-----'
      break;
    case 4:
      title = '-----Crypto-----'
      break;
    case 5:
      title = '-----Sweepstakes-----'
      break;
    default:

  }
  await bot.sendMessage(chatId, title,
    await getListAppByCategory(type)
  )
  await bot.deleteMessage(chatId, msg.message_id);
}

async function getListAppByCategory(type){
  var listApp = await db.getListAppByCategory(type)
  var keyboardList = listApp.map((listItem) => ([{
        text: `${listItem.number} ${listItem.name}`,
        callback_data: 'appid' + listItem.number
      }]));
  keyboardList.push(
    [{
            text: "Назад",
            callback_data: 'apps'
    }]
  )
  return {
        reply_markup: {
        text: '',
        inline_keyboard: keyboardList }}

}

function getAppsMenu(list) {
  return { reply_markup: {
    text: '',
    inline_keyboard: [
                          [{
                                  text: "Дейтинг (" + list.dating_count +")",
                                  callback_data: 'app_dating'
                          }],
                          [{
                                  text: "Гемблинг (" + list.gembling_count +")",
                                  callback_data: 'app_gambling'
                          }],
                          [{
                                  text: "Беттинг (" + list.betting_count +")",
                                  callback_data: 'app_betting'
                          }],
                          [{
                                  text: "Крипта (" + list.crypto_count +")",
                                  callback_data: 'app_cryto'
                          }],
                          [{
                                  text: "Розыгрыши (" + list.sweepstakes_count +")",
                                  callback_data: 'my_sweepstaics'
                          }],
                          [{
                                  text: "Назад",
                                  callback_data: 'back_to_general'
                          }]

                      ]
  }}
}

var general_menu = { reply_markup: {
  text: '',
  inline_keyboard: [
                        [{
                                text: "🙎‍♂️ Профиль",
                                callback_data: 'profile'
                        }],
                        [{
                                text: "🎮 Прилы",
                                callback_data: 'apps'
                        }],
                        [{
                                text: "📋 FAQ",
                                callback_data: 'faq'
                        }]

                    ]
}}

var profile_menu = { reply_markup: {
  text : '',
  inline_keyboard: [
                        [{
                                text: "💵 Баланс",
                                callback_data: 'balance'
                        }],
                        [{
                                text: "🎮 Мои прилы",
                                callback_data: 'my_apps'
                        }],
                        [{
                                text: "	📈 Статистика",
                                callback_data: 'statistic'
                        }],
                        [{
                                text: "Назад",
                                callback_data: 'back_to_general'
                        }]

                    ]
}}

var faq_menu = { reply_markup: {
  text: '',
  inline_keyboard: [
                        [{
                                text: "Назад",
                                callback_data: 'back_to_general'
                        }]

                    ]
}}

var balance_menu = { reply_markup: {
  text: '',
  inline_keyboard: [
                        [{
                                text: "Пополнить",
                                callback_data: 'add_balance'
                        }],
                        [{
                                text: "Назад",
                                callback_data: 'back_to_profile'
                        }]

                    ]
}}



app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
