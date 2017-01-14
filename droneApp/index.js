var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "ppub-c-5c099dc9-4fb8-41d4-a462-54224a4f47d7",
    subscribe_key : "sub-c-78d941e8-d9b7-11e6-b9cf-02ee2ddab7fe"
});

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // Create an Led on pin 13
  //var led = new five.Led(13);
  // Blink every half second
  //led.blink(500); 
  
  led = new five.Led(5);
  
  //led.strobe( 1000 );
  //this.repl.inject({
  //  led: led
  //});
  //console.log("You can interact with the bargraph via the variable 'led'");
  //console.log("e.g. led.stop();\n Hit control-d to exit.\n >> ");
 

  pubnub.subscribe({
	channel  : "my_channel",
	callback : function(message) {
			console.log( " > ", message );
			console.log(message.command);
			led.blink(500);
		}
	});
});
