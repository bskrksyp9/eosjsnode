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


// This method will create a new account if ran in Localnet
// However same may not work if ran in Testnet due to captcha/authentication

router.post('/', function (req, res) {


    console.log(req.body);

    // rpc.get_block(2).then(console.log); console.log(req.body.from)

    let newaccname = req.body.name;



    (async () => {
        try {
            const result = await api.transact({
                actions: [{
                    account: 'eosio',
                    name: 'newaccount',
                    authorization: [{
                        actor: 'eosio',
                        permission: 'active',
                    }],
                    data: {
                        creator: 'eosio',
                        name: newaccname,
                        owner: {
                            threshold: 1,
                            keys: [{
                                key: 'EOS6kphaZypFATNFVXWmMbBFDyyVLg35hK4CgfLL9eKNyQFVpqBqy',
                                weight: 1
                            }],
                            accounts: [],
                            waits: []
                        },
                        active: {
                            threshold: 1,
                            keys: [{
                                key: 'EOS6kphaZypFATNFVXWmMbBFDyyVLg35hK4CgfLL9eKNyQFVpqBqy',
                                weight: 1
                            }],
                            accounts: [],
                            waits: []
                        },
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            console.log(result);
        } catch (e) {
            returnmsg = '\nCaught exception: ' + e;
            if (e instanceof eosjs_jsonrpc.RpcError)
                returnmsg += '\n\n' + JSON.stringify(e.json, null, 2);
            console.log(returnmsg);
        }
    }
    )()
    res.send('POST Request Sent');
})

module.exports = router;