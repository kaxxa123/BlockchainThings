const { TONClient } = require('ton-client-node-js')          //npm install ton-client-node-js
const Giver         = require('./helpers/giver')             //Our Giver contract to get free crypto
const ListContract  = require('../ListContractContract')     //Our Auto-Generated smart contract wrapper

//public/private key pair generated using:tondev keys
//if we fix the key pair, we always get the same smart contract address
const fixedKeys = 
{
    "public": "b5a72c47b8cdce84bfe1a6814af7402d53c8377c46ac4a6293b16ed23f1f73de",
    "secret": "2d98b095f71fe831966c0d9dae493b95dac251e13f841c6fa4e32de522bd27eb"
}

async function main(client) {
    //Get a unique key pair to make sure we test with a freshly deployed contract
    const keys = await client.crypto.ed25519Keypair();

    //Load the contract with credit
    const addr = await Giver.load_credit(
            client, 
            ListContract.package, 
            {}, 
            keys, 
            100000000
    )
    console.log(`Contract Address before deployment: ${addr}`)

    //Deploy
    const list = new ListContract(client, addr, keys)
    await list.deploy();
    console.log(`Contract Deployed: ${list.address}`)

    //Run Tests
    await list.add({addr: '0:0000000000000000000000000000000000000000000000000000000000000001'});
    await list.add({addr: '0:0000000000000000000000000000000000000000000000000000000000000002'});
    await list.add({addr: '0:0000000000000000000000000000000000000000000000000000000000000003'});
    await list.add({addr: '0:0000000000000000000000000000000000000000000000000000000000000004'});
    await list.add({addr: '0:0000000000000000000000000000000000000000000000000000000000000005'});

    let first = await list.firstItemLocal()
    let last = await list.lastItemLocal()
    console.log(`First Item Id ${first.value0}`)
    console.log(`Last Item Id  ${last.value0}`)
    console.log();

    let id = Number(first.value0);
    await list.remove({id: id})
    await list.remove({id: (id+2)})
    await list.remove({id: (id+4)})

    first = await list.firstItemLocal()
    last = await list.lastItemLocal()
    console.log(`First Item Id ${first.value0}`)
    console.log(`Last Item Id  ${last.value0}`)
    console.log();

    let listVals = await list.readLocal({start: 0, toRead: 0})
    console.log(`Next Read Pos: ${listVals.next}`)
    console.log(`Addr List Out: ${listVals.addrList}`)
}

(async () => {
    try {

        //Connect to Local Node. Note the port setting
        //matches our local TON OS port.
        const client = await TONClient.create({
                                    servers: ['http://localhost:8033'],
                                });

        await main(client);
    	process.exit(0);
    } 
    catch (error) {
        console.error(error);
    }
})();
