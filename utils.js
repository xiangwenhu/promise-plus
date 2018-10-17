function isPromise(obj) {
    return obj instanceof Promise ||
        (
            !!obj &&
            typeof obj === 'object' &&
            typeof obj.then === 'function' &&
            typeof obj.catch === 'function'
        )
}

function toPromise(obj, ...params) {
    if (isPromise(obj)) {
        return obj
    } else if (typeof obj === 'function') {
        const p = obj(...params)
        /*
        if (isPromise(p)) {
            return p
        } */
        return p
    }
    return obj
}

function toPromises(promises = [], ...params){
    return  promises.map(p=>toPromise(p, ...params))
}

const isFunction = fn => typeof fn === 'function' || fn instanceof Function


module.exports = {
    isPromise,
    isFunction,
    toPromise,
    toPromises
}
