SayServ

Expose the say server on your mac (yes sorry, its mac only..although you could try something like this on ubuntu:http://superuser.com/questions/93691/mac-os-x-say-command-in-ubuntu).


Installation

1. Have node js installed.
2. npm install mdns
3. run the server with node sayserv.js

Usage

Server will listen on port 1337 by default (just a const in the script)

/browse - Show all other devices running sayserv on the network
/<message> - Play the given message on the machine
/<voice>/<message> - Play the given message on the machine using the given voice
/broadcast/<voice>/<message> - Play the given message on all machines on the network running sayserv


Next

Could randomly assign voices based on hostname?

Disclamer

Code is messy, feel free to submit pull requests.
http://en.wikipedia.org/wiki/MIT_License



