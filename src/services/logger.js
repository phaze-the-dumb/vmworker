module.exports = {
    name: 'Logger',
    init: () => {},
    requirements: [],
    Logger: class{
        constructor(name){
            this.chalk = require('chalk');
            this.name = name;

            this.time = () => {
                var time = new Date();
                return `[${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()} at: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]`
            }

            this.info('Logger Initialized');
        }
        log(...args){
            args.forEach(a => {
                console.log(this.time(), '['+this.name+']', a)
            })
        }
        info(...args){
            args.forEach(a => {
                console.log(this.time(), this.chalk.blue('['+this.name+']'), a)
            })
        }
        warn(...args){
            args.forEach(a => {
                console.log(this.time(), this.chalk.yellow('['+this.name+']'), a)
            })
        }
        error(...args){
            args.forEach(a => {
                console.log(this.time(), this.chalk.red('['+this.name+']'), a)
            })
        }
    }
}