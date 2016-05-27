var Slack = require('slack-client');

//Token IV DEVS
var token = 'xoxp-13346603558-14974519265-20845472466-07d1de73b4';


var slack = new Slack(token, true, true);

slack.on('open', function () {
    var channels = Object.keys(slack.channels)
        .map(function (k) { return slack.channels[k]; })
        .filter(function (c) { return c.is_member; })
        .map(function (c) { return c.name; });

    var groups = Object.keys(slack.groups)
        .map(function (k) { return slack.groups[k]; })
        .filter(function (g) { return g.is_open && !g.is_archived; })
        .map(function (g) { return g.name; });

    console.log('Hola, estoy atento a todos los mensaje');
   
});

slack.on('message', function(message){
  console.log('De que canal: ' + message.channel);
  
  user = slack.getUserByID(message.user); 
  userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";

  console.log('Usuario que mando el Mensaje : ' + userName);

  if (message.channel == 'C0EHB1RTP') {
    console.log('Llego mensaje del canal RSS, lo ignoro son solo noticias. Leemos cosas importantes...');
  }
  else {
    console.log('message: ' + message);
    console.log('Mensaje que mandaron:' + message.text);
  
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var mensajeRespuesta = '';

    if (message.text.indexOf('Buenos dias') != -1) {
          mensajeRespuesta = 'Buenos Días ' + userName;
          console.log('Encontre Buenos dias');
          console.log(mensajeRespuesta);
          
    }
      
    if (userName.text == 'slackBot') {
        mensajeRespuesta = 'SlackBot ya te salude :)';
    }

    channel.send(mensajeEnviado);
  
    console.log("Mensaje de respuesta: " + mensajeEnviado);
  }
})

slack.login();
