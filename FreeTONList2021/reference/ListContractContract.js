const ListContractContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "time"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "add",
                "inputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "remove",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "update",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "read",
                "inputs": [
                    {
                        "name": "start",
                        "type": "uint256"
                    },
                    {
                        "name": "toRead",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "addrList",
                        "type": "address[]"
                    },
                    {
                        "name": "next",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "firstItem",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "lastItem",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "nextItem",
                "inputs": [],
                "outputs": [
                    {
                        "name": "nextItem",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "totalItems",
                "inputs": [],
                "outputs": [
                    {
                        "name": "totalItems",
                        "type": "uint256"
                    }
                ]
            }
        ],
        "data": [],
        "events": [
            {
                "name": "EventItemAdded",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "EventItemDeleted",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "outputs": []
            }
        ],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "nextItem",
                "type": "uint256"
            },
            {
                "name": "totalItems",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "name": "prev",
                        "type": "uint256"
                    },
                    {
                        "name": "next",
                        "type": "uint256"
                    },
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "items",
                "type": "map(uint256,tuple)"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "2f276fe7049b39911f73861877fd579651cd9aeddf68964d741e80b5325a607e",
};
module.exports = { ListContractContract };