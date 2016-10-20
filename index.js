var timer = require('timers');
var msgCount = new Array();

timer.setInterval(function() {
  msgCount = new Array();
}, 40000);

var token = '238362601:AAH1PRHLEA9vPlB8vizuUuvQskqIWbrr82M';


var TelegramBot = require('node-telegram-bot-api');
// Setup polling way
var bot = new TelegramBot(token, {polling: {timeout: 1, interval: 50}});

// Any kind of message
bot.on('message', function (message) {
  var chatId = message.chat.id;
  var fromId = message.from.id;
  //console.log(message);
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
  else if (message.sticker != undefined) {
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

  /*if (message.text != undefined)
    console.log(msgCount[chatId][fromId][message.text]);
  if (message.sticker != undefined)
    console.log(msgCount[chatId][fromId][message.sticker.file_id]);
  if (message.document != undefined)
    console.log(msgCount[chatId][fromId][message.document.file_id]);*/

  if (message.text != undefined){
    if (msgCount[chatId][fromId][message.text] >= 10)
      kickFaggot(chatId, fromId, message.from.first_name);
    else if (msgCount[chatId][fromId][message.text] == 5)
      bot.sendMessage(chatId, 'Stahp ' + message.from.first_name);
  } else if (message.sticker != undefined) {
    if (msgCount[chatId][fromId][message.sticker.file_id] >= 10)
      kickFaggot(chatId, fromId, message.from.first_name);
    else if (msgCount[chatId][fromId][message.sticker.file_id] == 5)
      bot.sendMessage(chatId, 'Stahp ' + message.from.first_name);
  } else if (message.document != undefined)
    if (msgCount[chatId][fromId][message.document.file_id] >= 10)
      kickFaggot(chatId, fromId, message.from.first_name);
    else if (msgCount[chatId][fromId][message.document.file_id] == 5)
      bot.sendMessage(chatId, 'Stahp ' + message.from.first_name);
});

function kickFaggot(chatId, fromId, name) {
  bot.sendMessage(chatId, 'Spammer Detected! Name: ' + name);
  bot.sendMessage(chatId, 'You will be kicked in 3 seconds m8');
  timer.setTimeout(function() {
    if (fromId != '126151878') {
      bot.kickChatMember(chatId, fromId);
      bot.sendMessage(chatId, 'PRAISE ALLAH');
      console.log('Just kicked ' + name);

      timer.setTimeout(function() {
        bot.unbanChatMember(chatId, fromId);
        bot.sendMessage(fromId, 'You have been automatically unbanned.')
      }, 60000);
    }
  }, 3000);
}
