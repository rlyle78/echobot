/**
 * cylon-rolling-spider example
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

'use strict';

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "pub-c-5c099dc9-4fb8-41d4-a462-54224a4f47d7",
    subscribe_key : "sub-c-78d941e8-d9b7-11e6-b9cf-02ee2ddab7fe"
});

var RollingSpider = require("rolling-spider");
var temporal = require("temporal")
var ACTIVE = true;
var STEPS = 2;

RollingSpider.prototype.patrol = function(){
    temporal.queue([
      {
        delay: 5000,
        task: function () {
          // rollingSpider.flatTrim();
          rollingSpider.forward({ speed: 50, steps: 50 });
          // rollingSpider.startPing();
          console.log('Forward 50 steps');
          cooldown();
        }
      },
      {
        delay: 5000,
        task: function () {
          // rollingSpider.flatTrim();
          rollingSpider.counterClockwise({ speed: 50, steps: 40 });
          // rollingSpider.startPing();
          console.log('Turn Left 50 steps');
          cooldown();
        }
      },
      {
      	delay: 5000,
      	task: function(){
      	  // rollingSpider.flatTrim();
      	  rollingSpider.forward({ speed: 50, steps: 50 });
      	  // rollingSpider.startPing();
      	  console.log('Forward 50 steps');
      	  cooldown();
      	}
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          cooldown();
        }
      }
      // {
      //   delay: 1500,
      //   task: function () {
      //     rollingSpider.forward();
      //     rollingSpider.flatTrim();
      //     console.log('Forward');
      //   }
      // },
      // {
      //   delay: 1500,
      //   task: function () {
      //     rollingSpider.counterClockwise();
      //     rollingSpider.flatTrim();
      //     console.log('Turn Left');
      //   }
      // },
      // {
      //   delay: 1500,
      //   task: function () {
      //     rollingSpider.forward();
      //     rollingSpider.flatTrim();
      //     console.log('Forward');
      //   }
      // },  
      // {
      //   delay: 1500,
      //   task: function () {
      //     rollingSpider.counterClockwise();
      //     rollingSpider.flatTrim();
      //     console.log('Turn Left');
      //   }
      // }, 
      // {
      //   delay: 1500,
      //   task: function () {
      //     rollingSpider.forward();
      //     rollingSpider.flatTrim();
      //     console.log('Forward');
      //   }
      // }, 
      // {
      //   delay: 1500,
      //   task: function () {
      //     rollingSpider.counterClockwise();
      //     rollingSpider.flatTrim();
      //     console.log('Turn Left');
      //   }
      // }                   
    ]);
};

var rollingSpider = new RollingSpider();
var temporal = require('temporal');
// NEW CODE BELOW HERE

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS * 12);
}


rollingSpider.connect(function () {
	rollingSpider.setup(function(){

	    rollingSpider.flatTrim();
	    rollingSpider.startPing();
	    rollingSpider.flatTrim();

	  	console.log('Connected to drone', rollingSpider.name);
		console.log('Strength: ', rollingSpider.signalStrength(callback));

		setTimeout(function () {
      		console.log('ready for flight');
      		ACTIVE = true;
    	}, 1000);
	});
});


pubnub.subscribe({
		channel  : "my_channel",
		callback : function(message) {
				console.log( " > ", message );
				console.log(message.command);
				console.log(rollingSpider.status)
				switch(message.command) {
	   //  		case "initiate":
	   //      		//code block
				// console.log("initiate");
				// console.log(rollingSpider.status)

				// 	rollingSpider.flatTrim();
	   //  			rollingSpider.startPing(function(){ console.log('Pinging...') });
	   //  			rollingSpider.flatTrim();
	   //  		break;
	    		case "takeOff":
	        		//code block
			        console.log("take Off");
					rollingSpider.flatTrim();
					rollingSpider.takeOff();
					rollingSpider.startPing();
					console.log(rollingSpider.connected);
					// cooldown();
				break;
	    		case "straight":
	        		//code block
			        console.log("flying straight");
					rollingSpider.forward();
					// cooldown();
				break;
	    		case "back":
	        		//code block
			        console.log("flying back");
					rollingSpider.backward();
					// cooldown();
				break;
	    		case "right":
	        		//code block
			        console.log("flying right");
					rollingSpider.right();
					// cooldown();
				break;
	    		case "left":
	        		//code block
			        console.log("flying left");
					rollingSpider.left();
					// cooldown();

				break;	
	    		case "up":
	        		//code block
			        console.log("flying up");
					rollingSpider.up();
					// cooldown();
				break;
	    		case "down":
	        		//code block
			        console.log("flying down");
					rollingSpider.down();
					// cooldown();
				break;
	    		case "turn left":
	        		//code block
			        console.log("turning left");
					rollingSpider.turnLeft();
					// cooldown();
				break;
	    		case "turn right":
	        		//code block
			        console.log("turning right");
					rollingSpider.turnRight();
					// cooldown();
				break;
	    		case "patrol":
	        		//code block
			        console.log("patroling....");
					rollingSpider.patrol();
					// cooldown();
				break;
				case "stop":
	        		//code block
	        		temporal.clear();
					rollingSpider.land();
					// cooldown();
			    break;
	    		default:
	        		//default code block
	    			console.log('Invalid Command');
    			break;
				}
			}
		});

function callback(i, strength){
	console.log(i, strength);
}