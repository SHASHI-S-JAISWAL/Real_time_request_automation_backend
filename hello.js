const log = console.log ;
const chalk = require('chalk') ;
log(chalk.green('oo')) ;

setTimeout (() => {
    console.log (01)
},0)

setTimeout (() => {
    console.log (02)
},1000)

setTimeout (() => {
    console.log (03)
},2)

log('end1')
log('end2')