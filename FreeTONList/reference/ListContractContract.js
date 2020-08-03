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
