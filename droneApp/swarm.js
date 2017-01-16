'use strict';

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "pub-c-5c099dc9-4fb8-41d4-a462-54224a4f47d7",
    subscribe_key : "sub-c-78d941e8-d9b7-11e6-b9cf-02ee2ddab7fe"
});


var Swarm = require('rolling-spider').Swarm;
var temporal = require('temporal');

var swarm = new Swarm({membership: ['RS_R042799', 'RS_B138965']});

Swarm.prototype.patrol = function(){
    temporal.queue([
      {
        delay: 5000,
        task: function () {
          swarm.forward({ speed: 50, steps: 50 });
          console.log('Starting patrol...Forward 50 steps');
          
        }
      },
      {
        delay: 5000,
        task: function () {
          swarm.counterClockwise({ speed: 50, steps: 40 });
          console.log('Turn Left 50 steps');
          
        }
      },
      {
        delay: 5000,
        task: function(){
          swarm.forward({ speed: 50, steps: 50 });
          console.log('Forward 50 steps');
          
        }
      },
      {
        delay: 5000,
        task: function () {
          swarm.counterClockwise({ speed: 50, steps: 40 });
          console.log('Turn Left 50 steps');
          
        }
      },      
      {
        delay: 5000,
        task: function () {
          swarm.forward({ speed: 50, steps: 50 });
          console.log('Forward 50 steps');
          
        }
      },
      {
        delay: 5000,
        task: function () {
          swarm.counterClockwise({ speed: 50, steps: 40 });
          console.log('Turn Left 50 steps');
          
        }
      },
      {
        delay: 5000,
        task: function () {
          swarm.forward({ speed: 50, steps: 50 });
          console.log('Forward 50 steps');
          
        }
      },  
      {
        delay: 5000,
        task: function () {
          swarm.counterClockwise({ speed: 50, steps: 40 });
          console.log('Turn Left 50 steps');
          
        }
      }, 
      {
        delay: 5000,
        task: function () {
          swarm.forward({ speed: 50, steps: 50 });
          console.log('Forward 50 steps');
          
        }
      }, 
      {
        delay: 5000,
        task: function () {
          swarm.counterClockwise({ speed: 50, steps: 40 });
          console.log('Finishing patrol');
          
        }
      }                   
    ]);
};

swarm.assemble();

swarm.on('assembled', function () {
    console.log('Connected....')
    pubnub.subscribe({
    channel  : "my_channel",
    callback : function(message) {
            console.log( " > ", message );
            console.log(message.command);
            console.log(swarm.status)
            switch(message.command) {
   //       case "initiate":
   //           //code block
            // console.log("initiate");
            // console.log(swarm.status)

            //  swarm.flatTrim();
   //           swarm.startPing(function(){ console.log('Pinging...') });
   //           swarm.flatTrim();
   //       break;
            case "takeOff":
                //code block
                console.log("take Off");
                // swarm.flatTrim();
                swarm.takeOff();
                console.log(swarm.connected);
                // 
            break;
            case "straight":
                //code block
                console.log("flying straight");
                swarm.forward();
                // 
            break;
            case "back":
                //code block
                console.log("flying back");
                swarm.backward();
                // 
            break;
            case "right":
                //code block
                console.log("flying right");
                swarm.right();
                // 
            break;
            case "left":
                //code block
                console.log("flying left");
                swarm.left();
                // 

            break;
            case "up":
                //code block
                console.log("flying up");
                swarm.up();
                // 
            break;
            case "down":
                //code block
                console.log("flying down");
                swarm.down();
                // 
            break;
            case "turn left":
                //code block
                console.log("turning left");
                swarm.turnLeft();
                // 
            break;
            case "turn right":
                //code block
                console.log("turning right");
                swarm.turnRight();
                // 
            break;
            case "flip":
                //code block
                console.log("flipping...");
                swarm.frontFlip();
                // 
            break;
            case "patrol":
                //code block
                console.log("patroling....");
                swarm.patrol();
                // 
            break;
            case "stop":
                //code block
                console.log('Stopping');
                temporal.clear();
                swarm.land();
                // 
            break;
            default:
                //default code block
                console.log('Invalid Command');
            break;
            }
        }
    });
});