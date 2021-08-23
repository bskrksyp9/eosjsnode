const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
const fetch = require('node-fetch'); // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');

const defaultPrivateKey = '5KQygNn3xA58mEHRDefHzzaQvLuZyVJYD467MmxaEdTjNsnJBRQ'
//"5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const privateKeys = [defaultPrivateKey];
const signatureProvider = new JsSignatureProvider(privateKeys);

const rpc = new JsonRpc('https://jungle3.cryptolions.io:443', { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions


(async () => {
    console.log(await rpc.get_currency_balance('baccount1234', 'bktestacc123', 'SYS'));
  })();


  // (async () => {
  //   console.log(await (await rpc.get_account('alice')).account_name) //get alice's account info.  This assumes the account 'alice' has been created on the chain specified in the rpc object.
  // })();


// try {
//   const result =  rpc.get_currency_balance('eosio.token', 'alice', 'SOL');

// } catch (e) {
//   console.log('\nCaught exception: ' + e);
//   if (e instanceof RpcError)
//     console.log(JSON.stringify(e.json, null, 2));
// }
