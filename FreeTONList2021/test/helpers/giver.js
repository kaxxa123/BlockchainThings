const { TonClient, abiContract } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");

//The code here was mostly copied from:
//https://docs.ton.dev/86757ecb2/p/00f9a3-ton-os-se-giver

// Address of giver on TON OS SE
const giverAddress = '0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415';

// Giver ABI on TON OS SE
const giverAbi = abiContract({
    'ABI version': 2,
    header: ['time', 'expire'],
    functions: [
        {
            name: 'sendTransaction',
            inputs: [
                { 'name': 'dest', 'type': 'address' },
                { 'name': 'value', 'type': 'uint128' },
                { 'name': 'bounce', 'type': 'bool' }
            ],
            outputs: []
        },
        {
            name: 'getMessages',
            inputs: [],
            outputs: [
                {
                    components: [
                        { name: 'hash', type: 'uint256' },
                        { name: 'expireAt', type: 'uint64' }
                    ],
                    name: 'messages',
                    type: 'tuple[]'
                }
            ]
        },
        {
            name: 'upgrade',
            inputs: [
                { name: 'newcode', type: 'cell' }
            ],
            outputs: []
        },
        {
            name: 'constructor',
            inputs: [],
            outputs: []
        }
    ],
    data: [],
    events: []
});

// Giver keypair:
const giverKeyPair = {
    public: '2ada2e65ab8eeab09490e3521415f45b6e42df9c760a639bcf53957550b25a16',
    secret: '172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3'
};

// Requesting local test tokens from TON OS SE giver
async function get_tokens_from_giver(client, account, amnt) {
    const params = {
        send_events: false,
        message_encode_params: {
            address: giverAddress,
            abi: giverAbi,
            call_set: {
                function_name: 'sendTransaction',
                input: {
                    dest: account,
                    value: amnt,
                    bounce: false
                }
            },
            signer: {
                type: 'Keys',
                keys: giverKeyPair
            },
        },
    }
    await client.processing.process_message(params)
}

module.exports = {
    get_tokens_from_giver,
    giverAddress,
    giverAbi
}