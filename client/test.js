const os = require('os')
const ifaces = os.networkInterfaces()

const obj = {
    wlan: '1'
}

function test(perfer) {
    const ifaces = os.networkInterfaces()
    const connectedIfaces = Object.keys(ifaces).filter(ifname => {
        return ifname.toLowerCase().includes('wlan') || ifname.toLowerCase().includes('eth')
    })

    console.log(connectedIfaces)

    perfer = perfer === undefined ? '' : perfer.toLowerCase()
    
    return perfer ? ifaces[perfer].filter(iface => iface.family.toLowerCase() == 'ipv4')[0].address : ifaces[connectedIfaces[0]].filter(iface => iface.family.toLowerCase() == 'ipv4')[0].address
}

console.log(test())