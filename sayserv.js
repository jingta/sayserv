// Jingta
var exec = require('child_process').exec;
var child;
var PORT = 1337;

var msg = "Say Server: /voice/message or /message\n\n" +
    "Agnes               en_US    # Isn't it nice to have a computer that will talk to you?\n" +
    "Albert              en_US    #  I have a frog in my throat. No, I mean a real frog!\n" +
    "Alex                en_US    # Most people recognize me by my voice.\n" +
    "Bad News            en_US    # The light you see at the end of the tunnel is the headlamp of a fast approaching train.\n" +
    "Bahh                en_US    # Do not pull the wool over my eyes.\n" +
    "Bells               en_US    # Time flies when you are having fun.\n" +
    "Boing               en_US    # Spring has sprung, fall has fell, winter's here and it's colder than usual.\n" +
    "Bruce               en_US    # I sure like being inside this fancy computer\n" +
    "Bubbles             en_US    # Pull the plug! I'm drowning!\n" +
    "Cellos              en_US    # Doo da doo da dum dee dee doodly doo dum dum dum doo da doo da doo da doo da doo da doo da doo\n" +
    "Deranged            en_US    # I need to go on a really long vacation.\n" +
    "Fred                en_US    # I sure like being inside this fancy computer\n" +
    "Good News           en_US    # Congratulations you just won the sweepstakes and you don't have to pay income tax again.\n" +
    "Hysterical          en_US    # Please stop tickling me!\n" +
    "Junior              en_US    # My favorite food is pizza.\n" +
    "Kathy               en_US    # Isn't it nice to have a computer that will talk to you?\n" +
    "Pipe Organ          en_US    # We must rejoice in this morbid voice.\n" +
    "Princess            en_US    # When I grow up I'm going to be a scientist.\n" +
    "Ralph               en_US    # The sum of the squares of the legs of a right triangle is equal to the square of the hypotenuse.\n" +
    "Trinoids            en_US    # We cannot communicate with these carbon units.\n" +
    "Vicki               en_US    # Isn't it nice to have a computer that will talk to you?\n" +
    "Victoria            en_US    # Isn't it nice to have a computer that will talk to you?\n" +
    "Whisper             en_US    # Pssssst, hey you, Yeah you, Who do ya think I'm talking to, the mouse?\n" +
    "Zarvox              en_US    # That looks like a peaceful planet.\n";


var sayservs = {};

// import the module
var mdns = require('mdns');
var dns = require('dns');

// advertise a http server on port 4321
var ad = mdns.createAdvertisement(mdns.tcp('sayserv'), 4321);
ad.start();

// watch all http servers
var browser = mdns.createBrowser(mdns.tcp('sayserv'));
browser.on('serviceUp', function(service) {
  //  console.log("service up: ", service);
  var broadcast_count = sayservs[service.name] ? ( sayservs[service.name].broadcast_count || 0 ) + 1 : 1;
  sayservs[service.name] = service;
  sayservs[service.name].broadcast_count = broadcast_count;
  console.log("service up: %s [count:%s]", service.name, sayservs[service.name].broadcast_count);
    });
browser.on('serviceDown', function(service) {
  sayservs[service.name].broadcast_count = sayservs[service.name].broadcast_count - 1;
  console.log("service down: %s [count:%s]", service.name, sayservs[service.name].broadcast_count);
  if (sayservs[service.name].broadcast_count < 1) delete sayservs[service.name];
    });
browser.start();

// discover all available service types
//var all_the_types = mdns.browseThemAll(); // all_the_types is just another browser...


var activeServices = function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Services:\n\n");
    for(var key in sayservs) {
  response.write(sayservs[key].host + ':' + PORT + '\n');
    }
    response.end();
};


var broadcastMessage = function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Broadcasting to Services:\n\n");
    for(var key in sayservs) {
  var options = {
      host: sayservs[key].host,
      port: PORT,
      path: request.url.replace('/broadcast/', '/'),
      method: 'GET'
  };
  
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('end', function (chunk) {
      console.log('Message sent to ' + sayservs[key].host );
        });
      });
  req.on('error', function(e) {
    console.log('Problem with request to ' + sayservs[key].host + ': ' + e.message);
      });
  // finish request
  req.end();
  
  response.write(sayservs[key].host + ':' + PORT + '\n');
    }
    response.end();
};
  
var http = require('http');
http.createServer(function (request, response) {
  // ignore favicon requests
  if (request.url === "/favicon.ico") return;
  
  if (request.url === "/browser") return activeServices(request, response);
  
  if (request.url.match(/^\/broadcast\//)) return broadcastMessage(request, response);
  
  // send voices / instructions
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(msg);
  
  var segments = request.url.split('/');
  var message = segments[segments.length - 1];
  var voice = segments[segments.length - 2];
  var host = request.connection.remoteAddress;
  
  message = decodeURIComponent(message).replace(/\W/g,' ');
  voice = decodeURIComponent(voice).replace(/\W/g,' ');
  var cmd = "say " + (voice ? "-v " + voice + ' ' : '')  + message;
  child = exec(cmd);

  dns.reverse(host, function(err, domains) {
    if( err == null ) {
      console.log('[' + domains + '] cmd: ' + cmd);
    } else {
      console.log('[' + host + '] cmd: ' + cmd);
    }
  });

    }).listen(PORT, '0.0.0.0');
console.log('Server running at http://0.0.0.0:' + PORT);


var voice = "Zarvox";
var message = "Server running on port " + PORT;
var cmd = "say " + (voice ? '-v ' + voice + ' ' : '') + message;
child = exec(cmd);

