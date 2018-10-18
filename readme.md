# promise-plus

enhanced Promise


## Installation

    $ npm install promise-plus --save

## Usage

```javascript
var {sequence} = require('promise-plus')


const p1 = function () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(1)
            }, 1000)
        })
    },
    p2 = function () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(2)
            }, 2000)
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

const promises = [p1, p2, p3]

sequence(promises, function (r, i, ...args) {
    console.log('result:' + r, 'index:' + i, 'args:' + args)
}, {
    a: 1,
    b: 2
},666).then(r => printTime('result:', r))

// 输出结果
result:1 index:1 args: { a: 1, b: 2 } 666
result:2 index:2 args: { a: 1, b: 2 } 666
result:3 index:3 args: { a: 1, b: 2 } 666
2018-10-18 09:55:25 result: 3
```

## Documentation 
* [race](#race)   
* [all](#all)   
* [sequence](#sequence)   
* [delaySequence](#delaySequence)   


<a name="race"/>

### race(promises)

同 Promise.race, 只不数组里面可以是Promise也可以是返回Promise的函数

__Arguments__

```javascript
    promises   {Array} Promise Array
```

---------------------------------------
<a name="all"/>

### all(promises)

同 Promise.all, 只不数组里面可以是Promise也可以是返回Promise的函数

__Arguments__

```javascript
    promises   {Array} Promise Array
```

---------------------------------------

<a name="sequence"/>

### sequence(promises, cb, ...params)

顺序执行Promise, 每执行完一个Promise有回调函数, 回调函数可以是同步或者异步函数, 并支持额外额参数传递.

__Arguments__

```javascript
    promises   {Array} Promise Array
    cb {Function} sync or async Function
    params {Array} extra params
```

---------------------------------------




<a name="delaySequence"/>

### delaySequence(promises)

返回一个函数, 再传入参数后顺序执行Promise队列

__Arguments__

```javascript
    promises   {Array} Promise Array   
```

```js
    const promises = [p1, p2]
    let result = 0, pparam1, pparam2

    const ps = delaySequence(promises, function (r, i, param1, param2) {
        result += r
        pparam1 = param1
        pparam2 = param2
        return r
    })
    
    ps('param1', 'param2').then(r => {
       console.log(r)
    })
```


---------------------------------------





## License

  MIT