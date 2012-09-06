# SayServ

Expose the say server on your mac (yes sorry, its mac only..although you could try something like this on ubuntu: http://superuser.com/questions/93691/mac-os-x-say-command-in-ubuntu).


## Installation

1. Have node js installed. 
2. Have mdns installed (for peer discovery) `npm install mdns`
3. Set up to start via launchd or just run with `node sayserv.js`

## Usage

Server will listen on port 1337 by default (just a const in the script)

* /browse - Show all other devices running sayserv on the network
* /:message - Play the given message on the machine
* /:voice/:message - Play the given message on the machine using the given voice
* /broadcast/:voice/:message - Play the given message on all machines on the network running sayserv


### Next

Could randomly assign voices based on hostname?

### Disclamer

Code is messy, feel free to submit pull requests.

http://en.wikipedia.org/wiki/MIT_License

<sub><sup>
Copyright (C) 2012

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</sup></sub>

