var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "pub-c-9b38a227-9c98-42dd-af43-bd09a3eff137",
    subscribe_key : "sub-c-6d9eb720-2f24-11e5-bda8-02ee2ddab7fe"
});

debugger; 
/* ---------------------------------------------------------------------------
Publish Messages
--------------------------------------------------------------------------- */
var message = { "some" : "data" };
pubnub.publish({ 
    channel   : 'my_channel',
    message   : message,
    callback  : function(e) { console.log( "SUCCESS!", e ); },
    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
});
 
/* ---------------------------------------------------------------------------
Listen for Messages
--------------------------------------------------------------------------- */
pubnub.subscribe({
    channel  : "my_channel",
    callback : function(message) {
        console.log( " > ", message );
    }
});
 
/* ---------------------------------------------------------------------------
Type Console Message
--------------------------------------------------------------------------- */
var stdin = process.openStdin();
stdin.on( 'data', function(chunk) {
    pubnub.publish({
        channel : "my_channel",
        message : ''+chunk
    });
});
 
