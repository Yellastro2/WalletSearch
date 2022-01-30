const TonWeb = require('tonweb');
//const nacl = TonWeb.utils.nacl; // use nacl library for key pairs
const tonweb = new TonWeb();
var fs = require('fs');

var nacl = require('tweetnacl');

const delay = ms => new Promise(res => setTimeout(res, ms));

  

  check()
//searchByOrder()
var promcount = 0;
var count = 0;
  var success = 0;
  var totalBal = 0;


async function check(){
  
  
 while(true)
  {
    await delay(50);
    while(promcount>100)
      await delay(50);
  
  const keyPair = nacl.sign.keyPair(); // create new random key pair 
//console.log('gener new key: '+JSON.stringify(keyPair));
  let wallet = tonweb.wallet.create({publicKey: keyPair.publicKey, wc: 0}); // create interface to wallet smart contract (wallet v3 by default)
  promcount++;
  wallet.getAddress().then((adress)=> {
    const nonBounceableAddress = adress.toString(true, true, false);
  console.log('adress: '+nonBounceableAddress);
  tonweb.getBalance(adress)
.then((balance)=> {
  promcount--
  console.log('balance: ' + balance + ' try: ' + count +
    ' sucss: ' + success + ' total: ' + totalBal);
  if(balance>0){
  success++;
  totalBal+=balance;
  console.log('****** find some ******');
  console.log(JSON.stringify(keyPair));
  fs.appendFileSync("result.json",
  JSON.stringify(
  {key: keyPair, 
    adress: adress, 
    balance: balance 
  }));
}
  count++; 
}).catch((reas)=> console.log(reas))
  }).catch((reas)=> console.log(reas));
  } 
}


var lastKey = []
async function searchByOrder(){
 //while(true)
  {
    
    
    await delay(50);
    while(promcount>100)
      await delay(50);
    for(var i=0;i<32;i++){
      if(i==0||lastKey[i-1]>=255)
        if(lastKey[i]<255)
          lastKey[i]++;
    }
      
    var fKey = {
      secretKey: {}
    };
    for(var i=0;i<32;i++){
      fKey.secretKey[i] = 0;
    }
    console.log(JSON.stringify(fKey));
    fKey = 
    nacl.box.keyPair.fromSecretKey(
      new Uint8Array(
    Object.values(fKey.secretKey))
      )
    console.log(JSON.stringify(fKey));
    for(var i=32;i<64;i++){
      console.log('char '+fKey.publicKey[i-32]+
      'at index '+i);
      fKey.secretKey[i] = fKey.publicKey[i-32];
    }
    console.log(JSON.stringify(fKey));
    checkKey(fKey)
    
  }
}

function checkKey(fKey){
  let wallet = tonweb.wallet.create({publicKey: fKey.publicKey, wc: 0}); // create interface to wallet smart contract (wallet v3 by default)
  promcount++
  wallet.getAddress().then((adress)=> {
    const nonBounceableAddress = adress.toString(true, true, false);
  console.log('adress: '+nonBounceableAddress);
  tonweb.getBalance(adress)
.then((balance)=> {
  promcount--
  console.log('balance: ' + balance + ' try: ' + count +
    ' sucss: ' + success + ' total: ' + totalBal);
  if(balance>0){
  success++;
  totalBal+=balance;
  console.log('****** find some ******');
  console.log(JSON.stringify(keyPair));
  fs.appendFileSync("result.json",
  JSON.stringify(
  {key: keyPair, 
    adress: adress, 
    balance: balance 
  }));
}
}) 
}) 
  
}

//function findRigthKeyGen