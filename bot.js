var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy/; botRegexDDL = /^\/DDL/i; botRegexsloth = /^\/sloth/; botRegexthx = /^\/thanksjeeves/; botRegexDL = /^\/DL/; botRegexRules = /^\/rules/;
      botRegexP = /^\/PDL/i;  botRegexTw = /^\/twitch/i; botRegexSlut = /^\/slut/; botRegexStop = /^\/stop/; botRegexSch = /^\/TFL/i; botRegexweek = /^\/games/;
      siege1 = 'https://i.groupme.com/350x419.png.adc8c73a6c1547e0a9e04320296329f8'; siege2 = 'https://i.groupme.com/1279x752.jpeg.aa5d0401e0df495bba4b4e09dc5a6bd7'
      siege3 = 'https://i.groupme.com/960x960.png.006e180e05d841c6a2962e844bf1e6fd';
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
   else if(request.text && botRegexDDL.test(request.text)) {
    this.res.writeHead(200);
    //postMessage("http://www.daddyleagues.com/maddenrating?name=&position=all&team="+request.text.substring(5,8));
    postMessage("http://daddyleagues.com/TFL17/team/"+request.text.substring(5,8)+"/depthchart");
    this.res.end();
  } 
    else if(request.text && botRegexweek.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.daddyleagues.com/tfl17/schedules");
    this.res.end();
  } 
  else if(request.text && botRegexSch.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.daddyleagues.com/TFL17/team/"+request.text.substring(5,8)+"/schedule");
    this.res.end();
  } 
  else if(request.text && botRegexsloth.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://imgur.com/a/TWxrE");
    this.res.end();
  } 
  else if(request.text && botRegexthx.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://media.giphy.com/media/HqhbTFSiL41H2/giphy.gif");
    this.res.end();
  } 
  else if(request.text && botRegexSlut.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://media.tumblr.com/tumblr_m5ir9mZM4I1rt7tp5o1_500.gif");
    this.res.end();
  } 
  else if(request.text && botRegexStop.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Stop being a cunt");
    this.res.end();
  }
  else if(request.text && botRegexDL.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/tfl17/");
    this.res.end();
  } 
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/tfl17/rules");
    this.res.end();
  }
  else if(request.text && botRegexP.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(5,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://daddyleagues.com/tfl17/players?name="+rep+"&position=all&team=all");
    
    this.res.end();
  } 
  
  else if(request.text && botRegexSiege.test(request.text)) {
    this.res.writeHead(200);
    if(0.6 >= Math.random() > 0.3)
      postMessage(siege1);
    else if(Math.random() >0.6)
      postMessage(siege3)
    else
      postMessage(siege2);
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
