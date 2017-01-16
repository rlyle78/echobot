var Swarm = require('rolling-spider').Swarm;
var temporal = require('temporal');

var swarm = new Swarm({membership: ['RS_R042799', 'RS_B138965'], timeout: 15});

var testOne = function(){
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
                    console.log('Land');
                    swarm.land();
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
    }

var testTwo = function(){
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
                    console.log('backward');
                    swarm.backward();
                }
            },
            {
                delay: 3000,
                task: function () {
                    console.log('Land');
                    swarm.land();
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
    }

swarm.assemble();

swarm.on('assembled', function () {
    swarm.at('RS_R042799', testOne)
    swarm.at('RS_B138965', testTwo)   
});