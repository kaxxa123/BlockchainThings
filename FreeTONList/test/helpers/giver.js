//The code here was mostly copied from:
//https://docs.ton.dev/86757ecb2/p/00f9a3-local-giver
//
//The Giver is a smart contract that always exists in TON OS private blockchains
//It's code looks like this:
//pragma solidity >=0.5.0 <0.6.0;
//
//contract Giver {
//    constructor() public {}
//
//    function sendGrams(address payable dest, uint64 amount) public {
//        require(address(this).balance > amount, 60);
//        dest.transfer(amount);
//    }
//}
//

const giverAddress = '0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94';
const giverAbi = 
{
	"ABI version": 1,
	"functions": [
		{
			"name": "constructor",
			"inputs": [],
			"outputs": []
		},
		{
			"name": "sendGrams",
			"inputs": [
				{"name":"dest","type":"address"},
				{"name":"amount","type":"uint64"}
			],
			"outputs": []
		}
	],
	"events": [],
	"data": []
};

async function get_grams_from_giver(client, account, amnt) {
    const { contracts, queries } = client;

    const result = await contracts.run({
        address: giverAddress,
        functionName: 'sendGrams',
        abi: giverAbi,
        input: {
            dest: account,
            amount: amnt
        },
        keyPair: null,
    });

    const wait = await queries.accounts.waitFor(
        {
            id: { eq: account },
            balance: { gt: "0" }
        },
		'id balance'
    );
};

async function load_credit(client, package, constructorParams, keyPair, credit) {
    //Determine the contract address
    const futureAddress = (await client.contracts.createDeployMessage({
        package,
        constructorParams,
        keyPair,
    })).address

    //Load contract with credit
    await get_grams_from_giver(client, futureAddress, credit)

    return futureAddress
}

module.exports = {
    get_grams_from_giver,
    load_credit,
    giverAddress,
    giverAbi
} 