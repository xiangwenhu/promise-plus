var assert = require('assert');

const {
    race,
    all,
    sequence,
    delaySequence
} = require('..')

const p1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(1)
        }, 100)
    })
},
    p2 = function () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(2)
            }, 200)
        })
    },
    p3 = function () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(3)
            }, 3000)
        })
    }

function printTime() {
    console.log(new Date().toLocaleString(), ...arguments)
}



describe('promise-plus', function () {

    
    describe('#sequence()', function () {
        it('should return 3', function (done) {

            const promises = [p1, p2]
            let result = 0
            sequence(promises, function (r, i, ...args) {
                result += r
            }).then(r => {

                result === 3 ? done() : done('Error')
            })
        })
    })

    describe('#race()', function () {
        it('should return 1', function (done) {

            const promises = [p1, p2]
            race(promises).then(r => {
                r === 1 ? done() : done('Error')
            })
        })
    })



})