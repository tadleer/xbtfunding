const settings = require("./settings.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const api = "https://www.bitmex.com/api/v1/instrument/active"
const snekfetch = require("snekfetch")

//const BitMEXClient = require(api);
// See 'options' reference below
//const client = new BitMEXClient({mainnet: true});

bot.on("ready", async () =>{
    console.log (`Bot is ready! ${bot.user.tag}`);
    bot.generateInvite(['SEND_MESSAGES']).then(link => {console.log(link)
    }).catch(err => {console.log(err.stack);
    });
});


var request = require('request');
var moment = require('moment');
var countdown = require('moment-countdown');

var doUpdate = function() {
  request.get({url: 'https://www.bitmex.com/api/v1/instrument/active', json: true}, function(err, res, json) {
    if (err) {
      throw err;
    }
    if (Array.isArray(json)) {
      json.forEach(function (coin) {
        if (coin.symbol == "XBTUSD") {
          var d = new Date(coin.fundingTimestamp);
          var timestamp =  moment(d).add(1, 'hours').countdown().toString();
          var indicativeTimestamp = moment(d).add(9, 'hours').countdown().toString();

          var id = bot.guilds.get('392789369683181570')
          bot.user.setActivity(`${(coin.indicativeFundingRate*100).toFixed(4)}% in`+ ' '+ indicativeTimestamp.substring(0,7));
          id.me.setNickname(`${(coin.fundingRate*100).toFixed(4)}% in`+ ' '+ timestamp.substring(0,7))
          console.log(`${(coin.fundingRate*100).toFixed(4)}% in`+ timestamp);
        }
      });
    }
    setTimeout(doUpdate, 300000);
  });
}

bot.on('ready', () => {
  doUpdate();
});

  bot.login(settings.token);

        //bot.on('ready', () => {
          // bot.user.setActivity('funding')})

  //  })



    //const https = require('https');
    //const url = "https://www.bitmex.com/api/v1/instrument/active"

    //https.get(url, function(res){
        //var body = '';

        //res.on('data', function(chunk){
        //    body += chunk;
        //})

      //  res.on('end', function(){
            //var response = JSON.parse(body);



   //for ( var i=0; i<result.entries.length; i++ ) {
    //if (result.entries[i].id == 'fundingRate') {
      //var entry = result.entries[i];


      // Modifiy the entry as you wish here.
      // The question only mentioned setting "finished" to true, so that's
      // what I'm doing, but you can change it in any way you want to.
      //entry.finished = true;}}


// });


//module.exports.run = async(bot, message, args) => {
  //  snekfetch.post(api).then(console.log);

//}
