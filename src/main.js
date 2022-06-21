// Service Loader

console.log('SERVICE LOADER', 'Loading Services...')
const fs = require('fs');

let services = [];
let failed = [];

let load = ( list, cb ) => {
    failed = [];
    
    list.forEach(file => {
        console.log('SERVICE LOADER', 'Loading Service:', file);
    
        let service = require(`./services/${file}`);
        let hasRequirements = true;

        service.requirements.forEach(req => {
            if(!services.find(x => x.name === req)) {
                hasRequirements = false;
            }
        })

        if(hasRequirements){
            console.log('SERVICE LOADER', 'Loaded Service:', file);

            service.init();
            services.push(service);
        } else{
            console.log('SERVICE LOADER', 'Failed to load Service:', file);
            failed.push(file);
        }
    })

    cb();
}

load(fs.readdirSync('src/services'), () => {
    if(failed.length > 0){
        console.log('SERVICE LOADER', 'Failed to load Services:\n', failed.join('\n> '));
    
        load(failed, () => {
            if(failed.length > 0){
                console.log('SERVICE LOADER', 'Failed to load Services:\n', failed.join('\n> '));
            
                load(failed, () => {
                    process.exit(0);
                });
            }
        });
    }
});

