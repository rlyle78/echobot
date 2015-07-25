
var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "pub-c-9b38a227-9c98-42dd-af43-bd09a3eff137",
    subscribe_key : "sub-c-6d9eb720-2f24-11e5-bda8-02ee2ddab7fe"
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
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

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
      
    var speechOutput = "Welcom to Echo Bot, Please initiate connection to drone";
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
                         response.ask("Drone is ready to fly");
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
                         response.ask("Drone is flying");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( "FAILED! RETRY PUBLISH!", e ); }
                });          
    },
    Land: function (intent, session, response) {

               var landMessage = {
                        "command" : "land",
                        "sessionId" : session.sessionId
                    };
               console.log(pubnub.get_version());
                pubnub.publish({ 
                    channel   : 'my_channel',
                    message   : landMessage,
                    callback  : function(e) { 
                        console.log( "SUCCESS!", e ); 
                         response.ask("Going down");
                        },
                    error     : function(e) { 
                        response.tellWithCard("Could not connect", "Drone", "Could not connect");
                        console.log( " hFAILED! RETRY PUBLISH!", e ); }
                });          
    },
    default: function (intent, session, response) {
        response.ask("I could not understand, please repeat");
    },
    
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {

    // Create an instance of the Echobot skill.
       
    var echobot = new Echobot();
    echobot.execute(event, context);
    

};
