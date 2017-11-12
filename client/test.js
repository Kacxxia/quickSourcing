const dns = require('dns')

function resolveDns(domain) {
     dns.resolve4(domain, (err, address) => {
        if (err) throw err
        return address
    })
}
console.log(resolveDns('quicksourcing.info'))