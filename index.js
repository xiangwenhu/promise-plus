const { toPromises, isFunction } = require('./utils')

/**
 * 返回Promise.all
 * @param {Promise的集合或者之后后返回promise的函数集合} promises 
 * @param {附加参数} args 
 */
function all(promises = [], ...args) {
    return Promise.all(toPromises(promises, ...args))
}

/**
 * 返回Promise.race
 * @param {Promise的集合或者之后后返回promise的函数集合} promises 
 * @param {附加参数} args 
 */
function race(promises = [], ...args) {
    return Promise.race(toPromises(promises, ...args))
}

/**
 * 顺序执行Promise，并返回结果
 * @param {返回promise的函数集合} promises 
 * @param {每一步的回调函数，非异步,可以考虑后期支持} cb 
 * @param {附加参数} args 
 */
function sequence(promises = [], cb, ...args) {
    const p = Promise.resolve(),
        len = promises.length
    if (len <= 0) {
        return p
    }
    let i = 0
    //如果cb不是函数
    if (!isFunction(cb)) {
        cb = null
        args = [cb, ...args]
    }

    function execute(...params) {
        return p.then(r => {
            return promises[i](r, ...params)
        }).then(async r => {
            ++i
            cb && (r = await cb(r, i, ...params))
            return i > len - 1 ? Promise.resolve(r) : execute(...params)
        })
    }

    return execute(...args)
}

/**
 * 顺序执行Promise，并返回结果, 需要主动执行sequence(promises)(6)
 * @param {返回promise的函数集合} promises 
 * @param {附加参数} args 
 */
function delaySequence(promises, cb, ...args) {
    return function (..._args) {
        return sequence(promises, cb, ...[...args, ..._args])
    }
}


module.exports = {
    race,
    all,
    sequence,
    delaySequence
}