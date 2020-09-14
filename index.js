const fs = require('fs')
const fetch = require('node-fetch')
const homedir = require('os').homedir();
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})

var filepath = homedir+'/.lnd/data/chain/bitcoin/mainnet/admin.macaroon'

var url = 'https://localhost:8080/v1/loop/out/quote/250000'

async function go() {
    console.log(filepath)
    var macaroonString = fs.readFileSync(filepath);
    var macaroonHexString = Buffer.from(macaroonString, 'utf8').toString('hex');
    getWithMacaroon(macaroonHexString)
}

async function getWithMacaroon(mac){
    try {
        const r = await fetch(url,{
            agent,
            headers:{
                'Grpc-Metadata-macaroon': mac
            }
        })
        const j = await r.json()
        console.log("RESULT", j)
    } catch(e) {
        console.log("ERROR", e)
    }
}

go()