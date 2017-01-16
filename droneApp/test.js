var Swarm = require('rolling-spider').Swarm;
var temporal = require('temporal');

var swarm = new Swarm({membership: ['RS_R042799', 'RS_B138965']});

swarm.assemble();

swarm.on('assembled', function () {

    temporal.queue([
        {
            delay: 3000,
            task: function () {
                console.log('Takeoff');
                swarm.takeOff();
                // swarm.flatTrim();
            }
        },
        {
            delay: 5000,
            task: function () {
                console.log('Forward');
                swarm.forward();
            }
        },
        {
            delay: 3000,
            task: function () {
                swarm.land();
                console.log('Land');
            }
        },
        {
            delay: 3000,
            task: function () {
                temporal.clear();
                process.exit(0);
            }
        }
    ]);
});