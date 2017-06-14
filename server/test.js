function matchDetailPath(url) {
    const reg = /(?:localhost:3000\/api\/entities\/(\w{24})\/?)/
    return url.match(reg)
}
let url = 'localhost:3000/api/entities/542c2b97bac0595474108b4/'
console.log(matchDetailPath(url)[1])