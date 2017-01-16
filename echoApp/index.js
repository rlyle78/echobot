
var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "pub-c-5c099dc9-4fb8-41d4-a462-54224a4f47d7",
    subscribe_key : "sub-c-78d941e8-d9b7-11e6-b9cf-02ee2ddab7fe"
});

    
// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.794a94b4-3d99-466e-a014-a93b2ec75bd8";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Echobot is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Echobot = function () {

    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Echobot.prototype = Object.create(AlexaSkill.prototype);
Echobot.prototype.constructor = Echobot;

Echobot.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Echo Bot onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Echobot.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
   
    console.log("Echo Bot onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
      
    var speechOutput = "Welcom to Sky Net, Please initiate connection to drone";
    response.ask(speechOutput);
};

Echobot.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Echobot onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Echobot.prototype.intentHandlers = {
    // register custom intent handlers
    EchobotIntent: function (intent, session, response) {
       
   /*         console.log("here");
            var message = { "sessionId" : session.sessionId };
            console.log(message);
            pubnub.publish({ 
                channel   : 'my_channel',
                message   : message,
                callback  : function(e) { console.log( "SUCCESS!", e ); },
                error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
            });
    */
            response.tellWithCard("Hello World!", "Greeter", "Hello World!");
   
    },
    Initiate: function (intent, session, response) {
               var initiateMessage = {
                        "command" : "initiate",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : initiateMessage,
                    callback  : function(e) { 
                        console.log( "SUCCESS!", e ); 
                        response.tell("Drone is ready to fly");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },
    TakeOff: function (intent, session, response) {
               var takeOffmessage = {
                        "command" : "takeOff",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : takeOffmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is launching");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },
    Straight: function (intent, session, response) {
               var flyStraightmessage = {
                        "command" : "straight",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flyStraightmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flying straight");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    }, 
    Flip: function (intent, session, response) {
               var flipmessage = {
                        "command" : "flip",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flipmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flipping");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },           
    Back: function (intent, session, response) {
               var flyBackmessage = {
                        "command" : "back",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flyBackmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flying back");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    }, 
    Left: function (intent, session, response) {
               var flyLeftmessage = {
                        "command" : "left",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flyLeftmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flying left");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },  
    Right: function (intent, session, response) {
               var flyRightmessage = {
                        "command" : "right",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flyRightmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flying right");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },   
    Up: function (intent, session, response) {
               var flyUpmessage = {
                        "command" : "up",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flyUpmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flying up");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },
    Down: function (intent, session, response) {
               var flyDownmessage = {
                        "command" : "down",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : flyDownmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is flying down");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },  
    turnRight: function (intent, session, response) {
               var turnRightmessage = {
                        "command" : "turn right",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : turnRightmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is turning right");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },
    turnLeft: function (intent, session, response) {
               var turnLeftmessage = {
                        "command" : "turn left",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : turnLeftmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is turning left");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },   
    Patrol: function (intent, session, response) {
               var patrolmessage = {
                        "command" : "patrol",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : patrolmessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is patrolling");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },                                
    Stop: function (intent, session, response) {

               var stopMessage = {
                        "command" : "stop",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
               //response.setShouldEndSession(true);
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : stopMessage,
                    callback  : function(e) { 
                         console.log( "SUCCESS!", e ); 
                         response.tell("Drone is landing");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( " hFAILED! RETRY PUBLISH!", e ); }
                });          
    },
    default: function (intent, session, response) {
        response.ask("I could not understand, please repeat.");
    },
    
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {

    // Create an instance of the Echobot skill.
       
    var echobot = new Echobot();
    echobot.execute(event, context);
    

};
