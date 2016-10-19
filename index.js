var timer = require('timers');
var msgCount = new Array();

timer.setInterval(function() {
  msgCount = new Array();
}, 20000);

var token = '238362601:AAH1PRHLEA9vPlB8vizuUuvQskqIWbrr82M';


var TelegramBot = require('node-telegram-bot-api');
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Any kind of message
bot.on('message', function (message) {
  var chatId = message.chat.id;
  var fromId = message.from.id;
  console.log(message);
  if (msgCount[chatId] == undefined)
    msgCount[chatId] = new Array();
  if (msgCount[chatId][fromId] == undefined) {
    msgCount[chatId][fromId] = new Array();
  }

  if (message.document != undefined) {
    if (msgCount[chatId][fromId][message.document.file_id] == undefined) {
      msgCount[chatId][fromId][message.document.file_id] = 0;
    }
    else {
      msgCount[chatId][fromId][message.document.file_id]++;
    }
  }
  else if (message.document != undefined) {
    if (msgCount[chatId][fromId][message.sticker.file_id] == undefined) {
      msgCount[chatId][fromId][message.sticker.file_id] = 0;
    }
    else {
      msgCount[chatId][fromId][message.sticker.file_id]++;
    }
  }
  else {
    if (msgCount[chatId][fromId][message.text] == undefined) {
      msgCount[chatId][fromId][message.text] = 0;
    }
    else {
      msgCount[chatId][fromId][message.text]++;
    }
  }

  if (msgCount[chatId][fromId][message.text] == 10) {
    bot.sendMessage(chatId, 'Spammer Detected! Name: ' + message.from.first_name);
    bot.sendMessage(chatId, 'You will be kicked in 3 seconds m8');
    setTimeout(function() {
      if (fromId != '126151878') {
        bot.kickChatMember(chatId, fromId);
        bot.sendMessage(chatId, 'PRAISE ALLAH');
        console.log('Just kicked ' + message.from.first_name);
      }
    }, 3000)
  }
});
