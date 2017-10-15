
function test(arr){ 
    return arr.reduce((acc, i) => { 
        acc = acc.then(()=>console.log(i)) 
        return acc
}, Promise.resolve(null)) }


let a = new Promise(resolve => {
    setTimeout(() => resolve(1), 3000)
}).then(console.log)

a = a.then(() => {console.log('test')})

a.then(() => console.log('ok'))