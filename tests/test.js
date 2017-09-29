var systemd = require("systemd-mon");

var serviceName = process.argv[2];
if(!serviceName) {
        console.error('Service Name not provided.');
        process.exit(1);
}

var deamon1 = systemd.createClient(serviceName);

var watch1 = deamon1.watch();

watch1.on('active', function(data){
        console.log('active', data);
});

watch1.on('inactive', function(data){
        console.log('inactive', data);
});

watch1.on('activating', function(data){
        console.log('activating', data);
});

watch1.on('deactivating', function(data){
        console.log('deactivating', data);
});

watch1.on('error', function(err){
        console.error(err);
});

let count = 0;
setInterval(function(){
        count += 1;
        if(!count % 2 === 0){
                systemd.start(servicename);
        } else {
                systemd.stop(servicename);
        }
}, 15 * 1000);