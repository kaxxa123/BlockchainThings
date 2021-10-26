const { TonClient } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");

TonClient.useBinaryLibrary(libNode);

async function main(client) {
    // Generate new keys pair for new account.
    const keys = await client.crypto.generate_random_sign_keys();
    console.log();
    console.log(`Public: ${keys.public}`)
    console.log(`Secret: ${keys.secret}`)
    console.log();
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

