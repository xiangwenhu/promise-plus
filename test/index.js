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
            }, 300)
        })
    }

function printTime() {
    console.log(new Date().toLocaleString(), ...arguments)
}



describe('promise-plus', function () {

    describe('#race()', function () {
        it('should return 1', function (done) {

            const promises = [p1, p2]
            race(promises).then(r => {
                r === 1 ? done() : done('Error')
            })
        })
    })

    describe('#all()', function () {
        it('should return 3', function (done) {

            const promises = [p1, p2]
            all(promises).then(([r1, r2]) => {
                r1 + r2 === 3 ? done() : done('Error')
            })
        })
    })


    describe('#sequence()', function () {
        it('middle function add', function (done) {

            const promises = [p1, p2]
            let result = 0
            sequence(promises, function (r, i, ...args) {
                result += r
                return r
            }).then(r => {
                result === 3 ? done() : done('Error')
            })
        })

        it('pass param', function (done) {

            const promises = [p1, p2]
            let result = 0, pparam1, pparam2
            sequence(promises, function (r, i, param1, param2) {
                pparam1 = param1
                pparam2 = param2
                result += r
                return r
            }, 'param1', 'param2').then(r => {
                result === 3 && pparam1 === 'param1' && pparam2 === 'param2' ? done() : done('Error')
            })
        })

        it('async middle function', function (done) {

            const promises = [p1, p2]
            let result = 0
            sequence(promises, async function (r, i, ...args) {
                return new Promise((resolve, reject) => {
                    setTimeout(function () {
                        resolve(r + 10)
                    }, 5)
                })
            }).then(r => {
                r === 12 ? done() : done('Error')
            })
        })

    })


    describe('#delaySequence()', function () {
        it('should return 3 and get param1 , param2', function (done) {

            const promises = [p1, p2]
            let result = 0, pparam1, pparam2
            delaySequence(promises, function (r, i, param1, param2) {
                result += r
                pparam1 = param1
                pparam2 = param2
                return r
            })('param1', 'param2').then(r => {
                result === 3 && pparam1 === 'param1' && pparam2 === 'param2' ? done() : done('Error')
            })
        })
    })

})