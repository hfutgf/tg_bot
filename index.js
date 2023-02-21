const TelegramApi = require("node-telegram-bot-api")
const {gameOptions,againOptions}= require("./bd")

const token = '6012596332:AAHjURo1ypwDBif2TP2CGtBCWWDebN07PJY'

const bot = new TelegramApi(token, {
  polling: true
})

const chats = {}



const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Game oynemiz brat 1-9 gacham sonlar berman topsez qoyil qolaman topomasez 10 anjimaniya qilasz!')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber
  await bot.sendMessage(chatId, 'Topajak', gameOptions)

}

const start = () => {

  bot.setMyCommands([{
      command: '/start',
      description: 'Start berik'
    }, {
      command: '/info',
      description: "info kanala"
    },
    {
      command: '/game',
      description: "omad shou"
    }
  ])

  bot.on('message', async msg => {

    const text = msg.text

    const chatId = msg.chat.id

    if (text === '/start') {
      await bot.sendSticker(chatId, './img/sticker.webp')
      return bot.sendMessage(chatId, 'Dobro Pojalovat')
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Salom ${msg.from.first_name} ${msg.from.last_name}, biz siz uchun Andijondagi eng shirin somsalarni yetkazib beramiz`)
    }

    if (text === '/game') {
      startGame(chatId)
      return bot.sendMessage(chatId, 'Topajak', gameOptions)
    }
    return bot.sendMessage(chatId, 'Oka nito komandalarni yozib tashavosz romkezda bovuring')

  })

  bot.on('callback_query', async (msg) => {

    const data = msg.data;
    console.log(msg)
    console.log(chats)
    const chatId = msg.from.id
    if (data === '/again') {
      return await startGame(chatId)

    }
    await bot.sendMessage(chatId, `siz ${data} raqamni tanaldiz`)
    if (data === chats[chatId]) {
      return await bot.sendMessage(chatId, 'Brat voshemsizu aa ', againOptions)
    } else {
      return await bot.sendMessage(chatId, 'Oka chichdiz', againOptions)
    }
  })
}

start()