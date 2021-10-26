const { TonClient, signerKeys } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");

const ListContract  = require('../ListContractContract')     //Our Auto-Generated smart contract wrapper

TonClient.useBinaryLibrary(libNode);

//public/private key pair generated using: newkeys.js
//if we fix the key pair, we always get the same smart contract address
const fixedKeys = 
{
    "public": "10881235a2468466b16c924b90bf59eeac7e39cb5d091c46ce79f4435fbdfd44",
    "secret": "03d7ee6aff563c7335dd363d3de8553f42c7090481db4a6cc00048cbabeb2a07"
}

async function main(client) {
    // Generate new keys pair for new account.
    const keys = await client.crypto.generate_random_sign_keys();
    console.log();
    console.log(`Public: ${keys.public}`)
    console.log(`Secret: ${keys.secret}`)

    const account = new Account(ListContract.ListContractContract, 
                                { signer: signerKeys(keys),
                                  client,
                                });

    const address = await account.getAddress();
    console.log();
    console.log(`Future address of the contract will be: ${address}`);

    let response = await account.deploy({useGiver: true});       
    console.log();
    console.log("Deployment:");
    console.log(response);
    console.log("* * * * * * * * * *");

    response = await account.run("add", {addr: '0:0000000000000000000000000000000000000000000000000000000000000001'});
    console.log();
    console.log("Add1:");
    console.log(response);
    console.log("* * * * * * * * * *");

    await account.run("add", {addr: '0:0000000000000000000000000000000000000000000000000000000000000002'});
    await account.run("add", {addr: '0:0000000000000000000000000000000000000000000000000000000000000003'});
    await account.run("add", {addr: '0:0000000000000000000000000000000000000000000000000000000000000004'});
    await account.run("add", {addr: '0:0000000000000000000000000000000000000000000000000000000000000005'});
            
    let first = await account.runLocal("firstItem", {});
    let last  = await account.runLocal("lastItem", {});
    console.log(`First Item Id: ${first.decoded.output.value0}`)
    console.log(`Last Item Id   ${last.decoded.output.value0}`)
    console.log();

    let id = Number(first.decoded.output.value0);
    await account.run("remove", {id: id})
    await account.run("remove", {id: (id+2)})
    await account.run("remove", {id: (id+4)})

    first = await account.runLocal("firstItem", {});
    last  = await account.runLocal("lastItem", {});
    console.log(`First Item Id: ${first.decoded.output.value0}`)
    console.log(`Last Item Id   ${last.decoded.output.value0}`)
    console.log();

    let listVals = await account.runLocal("read", {start: 0, toRead: 0})
    console.log(`Next Read Pos: ${listVals.decoded.output.next}`)
    console.log(`Addr List Out: ${listVals.decoded.output.addrList}`)
}

(async () => {
    const endpoint = "http://localhost:8033"; 
    const client = new TonClient({ network: { endpoints: [endpoint] } });
    try {
        await main(client);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
})();
