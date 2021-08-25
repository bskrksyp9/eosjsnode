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

var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {

  console.log(req.body);

  // rpc.get_block(2).then(console.log); console.log(req.body.from)

  let from = req.body.from;
  let to = req.body.to;
  let quantity = req.body.quantity;



  // Transfer token
  (async () => {
    const result = await api.transact({
      actions: [{
        account: 'baccount1234',
        name: 'transfer',
        authorization: [{
          actor: 'baccount1234',
          permission: 'active',
        }],
        data: {
          from,
          to,
          quantity,
          memo: '',
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    console.dir(result.processed.block_num);
    res.send(JSON.stringify(result.processed))

  })().then(_result => {
    // process the result 
    console.log("Executed")

  })
    .catch(function (_e) {
      // handle the error
      console.log("Error code:", _e.json.code, "\n", "Message:", _e.json.message, "\n", "Cause:", _e.json.error.what)
      if (_e instanceof eosjs_jsonrpc.RpcError)
        returnmsg += '\n\n' + JSON.stringify(_e.json, null, 2);
      console.log(returnmsg);

    })
});

/* GET users listing. */
router.get('/', function (req, res) {
  // res.send('respond with a resource');


  (async () => {
    let get = await rpc.get_currency_balance('baccount1234', 'bktestacc123', 'SYS');

    res.send(JSON.stringify(get));
  })().then(_result => {
    // process the result
    console.log("Executed")
  })
    .catch((e) => {
      // handle the error
      console.log("Error code:", e.json.code, "\n", "Message:", e.json.message, "\n", "Cause:", e.json.error.what)
      // if (_e instanceof eosjs_jsonrpc.RpcError)
      //   returnmsg += '\n\n' + JSON.stringify(e.json, null, 2);
      // console.log(returnmsg);

    });
});


module.exports = router;
