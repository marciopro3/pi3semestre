const chance = require('chance')
const newChance = new chance()

module.exports = function code(){
    return newChance.integer({min: 100000, max: 999999})
}