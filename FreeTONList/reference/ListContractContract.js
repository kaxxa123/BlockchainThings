//
// This file was generated using TON Labs developer tools.
//

const abi = {
	"ABI version": 2,
	"header": ["time"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "add",
			"inputs": [
				{"name":"addr","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "remove",
			"inputs": [
				{"name":"id","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "update",
			"inputs": [
				{"name":"id","type":"uint256"},
				{"name":"addr","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "read",
			"inputs": [
				{"name":"start","type":"uint256"},
				{"name":"toRead","type":"uint256"}
			],
			"outputs": [
				{"name":"addrList","type":"address[]"},
				{"name":"next","type":"uint256"}
			]
		},
		{
			"name": "firstItem",
			"inputs": [
			],
			"outputs": [
				{"name":"value0","type":"uint256"}
			]
		},
		{
			"name": "lastItem",
			"inputs": [
			],
			"outputs": [
				{"name":"value0","type":"uint256"}
			]
		}
	],
	"data": [
		{"key":1,"name":"nextItem","type":"uint256"},
		{"key":2,"name":"totalItems","type":"uint256"}
	],
	"events": [
		{
			"name": "EventItemAdded",
			"inputs": [
				{"name":"id","type":"uint256"},
				{"name":"addr","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "EventItemDeleted",
			"inputs": [
				{"name":"id","type":"uint256"},
				{"name":"addr","type":"address"}
			],
			"outputs": [
			]
		}
	]
};

const pkg = {
    abi,
    imageBase64: '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',
};

class ListContractContract {
    /**
    * @param {TONClient} client
    * @param {string} address can be null if contract will be deployed
    * @param {TONKeyPairData} keys
    */
    constructor(client, address, keys) {
        this.client = client;
        this.address = address;
        this.keys = keys;
        this.package = pkg;
        this.abi = abi;
    }

    /**
     * @param {object} initParams
     * @param {string} initParams.nextItem (uint256)
     * @param {string} initParams.totalItems (uint256)
     */
    async deploy(initParams) {
        if (!this.keys) {
            this.keys = await this.client.crypto.ed25519Keypair();
        }
        this.address = (await this.client.contracts.deploy({
            package: pkg,
            constructorParams: {},
            initParams,
            keyPair: this.keys,
        })).address;
    }

    /**
    * @param {string} functionName
    * @param {object} input
    * @return {Promise.<object>}
    */
    async run(functionName, input) {
        const result = await this.client.contracts.run({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }

   /**
    * @param {string} functionName
    * @param {object} input
    * @return {Promise.<object>}
    */
    async runLocal(functionName, input) {
        const result = await this.client.contracts.runLocal({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }

    /**
     * @param {object} params
     * @param {string} params.addr (address)
     */
    add(params) {
        return this.run('add', params);
    }

    /**
     * @param {object} params
     * @param {string} params.addr (address)
     */
    addLocal(params) {
        return this.runLocal('add', params);
    }

    /**
     * @param {object} params
     * @param {string} params.id (uint256)
     */
    remove(params) {
        return this.run('remove', params);
    }

    /**
     * @param {object} params
     * @param {string} params.id (uint256)
     */
    removeLocal(params) {
        return this.runLocal('remove', params);
    }

    /**
     * @param {object} params
     * @param {string} params.id (uint256)
     * @param {string} params.addr (address)
     */
    update(params) {
        return this.run('update', params);
    }

    /**
     * @param {object} params
     * @param {string} params.id (uint256)
     * @param {string} params.addr (address)
     */
    updateLocal(params) {
        return this.runLocal('update', params);
    }

    /**
     * @typedef ListContractContract_read
     * @type {object}
     * @property {string[]} addrList  (address[])
     * @property {string} next  (uint256)
     */

    /**
     * @param {object} params
     * @param {string} params.start (uint256)
     * @param {string} params.toRead (uint256)
     * @return {Promise.<ListContractContract_read>}
     */
    read(params) {
        return this.run('read', params);
    }

    /**
     * @param {object} params
     * @param {string} params.start (uint256)
     * @param {string} params.toRead (uint256)
     * @return {Promise.<ListContractContract_read>}
     */
    readLocal(params) {
        return this.runLocal('read', params);
    }

    /**
     * @typedef ListContractContract_firstItem
     * @type {object}
     * @property {string} value0  (uint256)
     */

    /**
     * @return {Promise.<ListContractContract_firstItem>}
     */
    firstItem() {
        return this.run('firstItem', {});
    }

    /**
     * @return {Promise.<ListContractContract_firstItem>}
     */
    firstItemLocal() {
        return this.runLocal('firstItem', {});
    }

    /**
     * @typedef ListContractContract_lastItem
     * @type {object}
     * @property {string} value0  (uint256)
     */

    /**
     * @return {Promise.<ListContractContract_lastItem>}
     */
    lastItem() {
        return this.run('lastItem', {});
    }

    /**
     * @return {Promise.<ListContractContract_lastItem>}
     */
    lastItemLocal() {
        return this.runLocal('lastItem', {});
    }

}

ListContractContract.package = pkg;

module.exports = ListContractContract;
