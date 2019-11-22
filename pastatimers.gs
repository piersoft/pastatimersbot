var token = ''; // inserire il token del bot creato con @botfather
var webAppUrl = 'https://script.google.com/macros/s/XXXXXX/exec'; // inserire l'indirizzo dell'applicazione, generato da google ed eseguire la funzione setWebhook dal menu di google script
var telegramUrl = 'https://api.telegram.org/bot' + token;

var BUTTON_MESSAGE1 = 'Ricerca';
var BUTTON_MESSAGE2 = 'Info';
var BUTTON_MESSAGE3 = 'Marche';

// WEBHOOK
function setWebhook() {
    var url = telegramUrl + '/setWebhook';
    var response = UrlFetchApp.fetch(url, {
        'method': 'post',
        'payload': {
            'url': webAppUrl
        }
    });
    Logger.log(response.getContentText());
}


function sendKeyboard(chatId, text, keyboard, resize) {
   Utilities.sleep(1000 * 1);

    keyboard = JSON.stringify(
        {
            'keyboard': keyboard,
            'resize_keyboard': resize
        }
    );

    var url = telegramUrl + '/sendMessage';
    var response = UrlFetchApp.fetch(url, {
        'method': 'post',
        'payload': {
           'chat_id': chatId,
           'text': text,
           'parse_mode': 'HTML',
           'reply_markup': keyboard
        }
    });
}

function doPost(e) {
  var update = JSON.parse(e.postData.contents);
  // Replace with your token
  var API_TOKEN = token;
  
    var msg = update.message;
    var chatId = msg.chat.id;

   if (msg.text == 'Ricerca' || msg.text == 'ricerca' || msg.text == '/ricerca') {
  
        var quote = 'Per fare una ricerca basta scrivere direttamente il tipo di pasta.\nEsempio 👉 <b>bucatini</b>\nSe si vuole filtrare per marca si può usare il carattere , (virgola)\nEsempio 👉 <b>spaghetti,barilla</b>';
        
        var payload = {
          'method': 'sendMessage',
          'chat_id': String(chatId),
          'text': quote,
          'parse_mode': 'HTML'
        }

        var data = {
          "method": "post",
          "payload": payload
        }

        // Replace with your token
        UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
        
      }else if (msg.text == '/info' || msg.text == 'Info' || msg.text == '/start') {
  
  
        var quote = 'Bot del progetto <a href="https://pastatimers.app">Pasta Timers</a>\nPuoi cercare tutti i minuti di cottura della pasta :). \nSegui le istruzioni sul sito per aggiungerne altre.\nBot realizzato da @piersoft, in licenza MIT e codice su github.com/piersoft';
  
        keyboard = JSON.stringify(
        {
            'keyboard': [[BUTTON_MESSAGE1,BUTTON_MESSAGE2]],
            'resize_keyboard': true
        }
    );

        var payload = {
          'method': 'sendMessage',
          'chat_id': String(chatId),
          'text': quote,
          'parse_mode': 'HTML',
          'reply_markup': keyboard
        }

        var data = {
          "method": "post",
          "payload": payload
        }

        // Replace with your token
        UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);

      }else{
      
      var trovato=0;
      var messaggio=msg.text;
      
      if (messaggio.indexOf('') > -1)  {
          var quote ='';

      if (messaggio.indexOf(',') > -1)  {
        var tmp=messaggio.replace(' ','');
        var tmp1=tmp.split(',');
        
        
        var url = 'https://pastatimers.app/producers.json';
        var data = UrlFetchApp.fetch(url);
        var posts = JSON.parse(data);
        var quote ='';
       
       for (var i=0; i < posts.length; i++ )

        {     
          if ((posts[i]['name'].toUpperCase()).indexOf(tmp1[1].toUpperCase()) > -1)
        {
       
       var url1 = 'https://pastatimers.app/'+posts[i]['timers'];
        var data1 = UrlFetchApp.fetch(url1);
        var posts1 = JSON.parse(data1);
        for (var ii=0; ii < posts1.length; ii++ )

        {   
 
           if ((posts1[ii]['name'].toUpperCase()+' ').indexOf(tmp1[0].toUpperCase()+' ') > -1)
            {
                      quote += '<b> ♨  '+posts1[ii]['name']+'</b>\n⏱ <b>'+posts1[ii]['time']+' minuti</b>\n';
                     quote += '<i>👉 '+posts1[ii]['line']+' - '+posts1[ii]['producer']+'</i>\n';
                     quote +='🌐<a href=\"'+posts1[ii]['url']+'\"> Dettagli</a>\n';
                      quote +='➖➖➖➖➖➖➖➖\n';
                      trovato=1;
            }

        }
        
  }
  }
     }else{
     
       var tmp=messaggio.replace(' ','');
        
        var url = 'https://pastatimers.app/producers.json';
        var data = UrlFetchApp.fetch(url);
        var posts = JSON.parse(data);
        var quote ='';
       
       for (var i=0; i < posts.length; i++ )

        {     
       var url1 = 'https://pastatimers.app/'+posts[i]['timers'];
        var data1 = UrlFetchApp.fetch(url1);
        var posts1 = JSON.parse(data1);
        for (var ii=0; ii < posts1.length; ii++ )

        {   
 
           if ((posts1[ii]['name'].toUpperCase()+' ').indexOf(tmp.toUpperCase()+' ') > -1)
            {
                      quote += '<b> ♨  '+posts1[ii]['name']+'</b>\n⏱ <b>'+posts1[ii]['time']+' minuti</b>\n';
                      quote += '<i>👉 '+posts1[ii]['line']+' - '+posts1[ii]['producer']+'</i>\n';
                      quote +='🌐<a href=\"'+posts1[ii]['url']+'\"> Dettagli</a>\n';
                      quote +='➖➖➖➖➖➖➖➖\n';
                      trovato=1;
            }

        }
        
  }
  }
     
  //   if (trovato==0) quote='La ricerca non è andata a buon fine per '+tmp1[0].toUpperCase()+','+tmp1[1].toUpperCase()+' '+tmp1+' '+posts[0]['name'].toUpperCase();
if (trovato==0) quote='La ricerca non è andata a buon fine';

        var payload = {
          'method': 'sendMessage',
          'chat_id': String(chatId),
          'text': quote,
          'parse_mode': 'HTML',
          'disable_web_page_preview': 'true'
        }

        var data = {
          "method": "post",
          "payload": payload
        }


        UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
      }
      
       
    
  
    }
}
