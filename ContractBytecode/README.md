# Contract Deploy

Studying smart contract bytecode to demonstrate how deployment transactions work in EVM chains.
 
The code runs against any EVM chain. The project is configured to use Avalanche Fuji simply because it is easy to get faucet AVAX for this chain.

 * [Avalanche Fuji Snowtrace Explorer](https://testnet.snowtrace.io/)

 * [Avalanche Fuji Faucet](https://faucet.avax.network/)

<BR />


## Clone and Compile the Contract

A hardhat project to compile the example code:

```BASH
git clone git@github.com:kaxxa123/BlockchainThings.git
cd ./BlockchainThings/ContractBytecode

npm install
npx hardhat compile
```

<BR />


## Deploy and Run the Contract

Create a `.env` file with a single value `PRIVATE_KEY_1`. Use the [.env_template](./.env_template) as a reference. `PRIVATE_KEY_1` must contain the private key for an account having some FUJI AVAX. Ask for it at the [faucet](https://faucet.avax.network/).


```BASH
npx hardhat console --network fuji
```

```JS
//Note the Ethers major version in use:
ethers.version
// '6.5.1'

accounts = await ethers.getSigners()
accounts[0].address

fs = require("fs")
fs.readFile('./artifacts/contracts/Demo.sol/Demo.json', 'utf8', (err, data) => compile = JSON.parse(data))

//If the constructor did not take any parameters
//this would be the code passed to sendTransaction like so:
//await accounts[0].sendTransaction({to: null, data: compile.bytecode})
compile.bytecode

//However our contract requires one parameter
paramIn = 200
DemoFactory = await ethers.getContractFactory("Demo")
complete = await DemoFactory.getDeployTransaction(paramIn)
complete.data

//Remove leading "0x" from the strings
bytecode = compile.bytecode.slice(2)
deployedBytecode = compile.deployedBytecode.slice(2)
bytecodeEx = complete.data.slice(2)

//Confirm that the bytecode ends with the deployedBytecode
assert(bytecode.length - bytecode.indexOf(deployedBytecode) ==  deployedBytecode.length)

//Confirm that bytecodeEx starts with bytecode
assert(bytecodeEx.indexOf(bytecode) == 0)

//Confirm that the constructor input parameter matches our input
//'00000000000000000000000000000000000000000000000000000000000000c8'
param = bytecodeEx.slice(bytecode.length)
assert(parseInt(param, 16) == paramIn)

trn = await accounts[0].sendTransaction({to: null, data: complete.data})
receipt = await trn.provider.getTransactionReceipt(trn.hash)

receipt.contractAddress
```

Test contract deployment:

```JS
abi = DemoFactory.interface.fragments
addr = receipt.contractAddress
demo = new ethers.Contract(addr, abi, accounts[0])

await demo.owner()
await demo.counter()

await demo.increase()
await demo.counter()
```

<BR />

## Important Values for Reading the bytecode


| Description | Computation | Hex Value|
|-------------|-------------|------|
| bytecode length                                  | `(bytecodeEx.length/2).toString(16)`  | `21f` |
| bytecode length excluding constructor parameters | `(bytecode.length/2).toString(16)`    | `1ff` |
| constructor parameters length                    | `((bytecodeEx.length - bytecode.length)/2).toString(16)` | `20` |
| contract code length                             | `(deployedBytecode.length/2).toString(16)` | `15b` |
| contract code offset within bytecode stream      | `((bytecode.length - deployedBytecode.length)/2).toString(16)` | `a4` |
| constructor parameters value                     | `(200).toString(16)` | `c8` |
| condition value in `require (start > 100, ...)`  | `(100).toString(16)` | `64` |
| `owner` state variable storage key   | | `0` |
| `counter` state variable storage key | | `1` |




<BR />

## Stepping through the bytecode

Run the bytecode on [evm.codes playground](https://www.evm.codes/playground). Just supply the `bytecodeEx` value...

```
60806040526040516101ff3803806101ff8339810160408190526100229161007c565b606481116100625760405162461bcd60e51b8152602060048201526009602482015268151bdbc81cdb585b1b60ba1b604482015260640160405180910390fd5b600080546001600160a01b03191633179055600155610095565b60006020828403121561008e57600080fd5b5051919050565b61015b806100a46000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806361bc221a146100465780638da5cb5b14610062578063e8927fbc146100a7575b600080fd5b61004f60015481565b6040519081526020015b60405180910390f35b6000546100829073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610059565b6100af6100b1565b005b6001600081546100c0906100c6565b90915550565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361011e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea26469706673582212203625e2f4c8681102047e3c8bf8db0150f7218225f70bf7d984366ac6c78e4db064736f6c6343000812003300000000000000000000000000000000000000000000000000000000000000c8
```

<BR />

## bytecode Breakdown

```
idx     bytecode    opcodes         stack               description

00      60 80       PUSH1 80        [80]
02      60 40       PUSH1 40        [40, 80]            Save 80 to memory location 40
04      52          MSTORE          []
05      60 40       PUSH1 40        [40]
07      51          MLOAD           [80]                Load value from memory location 40
08      61 01ff     PUSH2 01ff      [1ff, 80]           1ff - bytecode length excluding ctr parameters
0b      38          CODESIZE        [21f, 1ff, 80]      21f - bytecode length 
0c      03          SUB	            [ 20, 80]           Subtracting gives the ctr parameters length
0d      80          DUP1            [20, 20, 80]
0e      61 01ff     PUSH2 01ff      [1ff, 20, 20, 80]
11      83          DUP4            [80, 1ff, 20, 20, 
                                     80]
12      39          CODECOPY        [20, 80]            Copy ctr parameters of size 20 from 1ff to  
                                                        memory location 80
```

This code just copied the ctr input parameter to memory.

Stack Values: <BR />
`20` - size of the ctr parameter <BR />
`80` - memory location of the ctr parameter<BR />

```
idx     bytecode    opcodes         stack               description

13      81          DUP2            [80, 20, 80]
14      01          ADD             [a0, 80]            Get memory location following the ctr parameter
15      60 40       PUSH1 40        [40, a0, 80]
17      81          DUP2            [a0, 40, a0, 80]
18      90          SWAP1           [40, a0, a0, 80]        
19      52          MSTORE          [a0, 80]            Store memory pointer a0 to memory location 40

1a      61 0022     PUSH2 0022      [22, a0, 80]
1d      91          SWAP2           [80, a0, 22]
1e      61 007c     PUSH2 007c      [7c, 80, a0, 22]
21      56          JUMP            [80, a0, 22]        Jump to 7c
```

Stack Values: <BR />
`a0` - next memory location following the ctr parameter <BR />
`22` - "jump back" location to continue from where the code left <BR />
`80` - memory location of the ctr parameter <BR />


```
idx     bytecode    opcodes         stack               description

7c      5b          JUMPDEST        [80, a0, 22]                    
7d      60 00       PUSH1 00        [00, 80, a0, 22]
7f      60 20       PUSH1 20        [20, 00, 80, a0, 
                                     22]
81      82          DUP3            [80, 20, 00, 80, 
                                     a0, 22]
82      84          DUP5            [a0, 80, 20, 00, 
                                     80, a0, 22]
83      03          SUB             [20, 20, 00, 80,    Get the ctr parameter size
                                     a0, 22]
84      12          SLT             [00, 00, 80, a0,    Is (top < top-1) ?
                                     22]
85      15          ISZERO          [01, 00, 80, a0,    Is (top == 00) ?
                                     22]
86      61 008e     PUSH2 008e      [8e, 01, 00, 80, 
                                     a0, 22]
89      57          JUMPI           [00, 80, a0, 22]    If (top-1 != 0) Jump to 8e
8a      60 00       PUSH1 00
8c      80          DUP1	
8d      fd          REVERT	
```

This code verified the expected ctr parameters size.

Stack Values: <BR />
`80` - memory location of the ctr parameter <BR />
`a0` - memory location following the ctr parameter <BR />
`22` - "jump back" location <BR />


```
idx     bytecode    opcodes         stack               description

8e      5b          JUMPDEST        [00, 80, a0, 22]
8f      50          POP             [80, a0, 22]
90      51          MLOAD           [c8, a0, 22]        Load ctr parameter from memory location 80
91      91          SWAP2           [22, a0, c8]
92      90          SWAP1           [a0, 22, c8]
93      50          POP             [22, c8]
94      56          JUMP            [c8]                Jump back to location 22
```

Stack Values: <BR />
`c8` - ctr input parameter value

```
idx     bytecode    opcodes         stack               description

22      5b          JUMPDEST        [c8]
23      60 64       PUSH1 64        [64, c8]            64 = dec 100, ...we are processing
                                                        require (start > 100, "Too small")
25      81          DUP2            [c8, 64, c8]
26      11          GT              [01, c8]            Is (c8 > 64)?
27      61 0062     PUSH2 0062      [62, 01, c8]
2a      57          JUMPI           [c8]                If (top-1 != 0) Jump to 62
```

This code checked the require condition in: <BR />
`require (start > 100, "Too small")`

If the check failed, do code would not jump and the code sequence that follows reverts.

Stack Values: <BR />
`c8` - ctr input parameter value

```
idx     bytecode    opcodes         stack               description

2b      60 40       PUSH1 40                            Following
2d      51          MLOAD                               this
2e      62 461bcd   PUSH3 461bcd                        code
32      60 e5       PUSH1 e5                            sequence
34      1b          SHL                                 it ultimately
35      81          DUP2                                reverts
36      52          MSTORE                              as expected 
37      60 20       PUSH1 20                            from a 
39      60 04       PUSH1 04                            failed 
3b      82          DUP3                                require
3c      01          ADD                                 clause
3d      52          MSTORE	
3e      60 09       PUSH109
40      60 24       PUSH1 24
42      82          DUP3	
43      01          ADD	
44      52          MSTORE	
45      68 151bdb   PUSH9 151bdb
           c81cdb         c81cdb
           585b1b         585b1b
4f      60 ba       PUSH1 ba
51      1b          SHL	
52      60 44       PUSH1 44
54      82          DUP3	
55      01          ADD	
56      52          MSTORE	
57      60 64       PUSH1 64
59      01          ADD	
5a      60 40       PUSH1 40
5c      51          MLOAD	
5d      80          DUP1	
5e      91          SWAP2	
5f      03          SUB	
60      90          SWAP1	
61      fd          REVERT                              If require failed we would revert here.
                    ======
```

When the require condition is satisfied, the code continues from here...

```
idx     bytecode    opcodes         stack               description

62      5b          JUMPDEST        [c8]
63      60 00       PUSH1 00        [00, c8]
65      80          DUP1            [00, 00, c8]
66      54          SLOAD           [00, 00, c8]        Load from state storage value at key 00
                                                        This key maps to the owner state var
67      60 01       PUSH1 01        [01, 00, 00, c8] 
69      60 01       PUSH1 01        [01, 01, 00, 00, 
                                     c8]
6b      60 a0       PUSH1 a0        [a0, 01, 01, 00, 
                                     00, c8] 
6d      1b          SHL             [10000000000...,    (top-1) << (top)
                                     01, 00, 00, c8]    Shift by a0 bits = 20 bytes = size of an address

6e      03          SUB             [fffffffffff...,    We just created a 20 byte mask
                                     00, 00, c8]            

6f      19          NOT             [fff...00000000,    Invert the top value
                                     00, 00, c8]        !(top)

70      16          AND             [00, 00, c8]        top AND (top-1)
71      33          CALLER          [addr, 00, 00, c8]  get caller address
72      17          OR              [addr, 00, c8]
73      90          SWAP1           [00, addr, c8]
74      55          SSTORE          [c8]                Store address at slot 0
                                                        owner = msg.sender
75      60 01       PUSH1 01        [01, c8]
77      55          SSTORE          []                  Store ctr parameter at slot 1
                                                        counter = start
78      61 0095     PUSH2 0095      [95]
7b      56          JUMP            []                  Jump to location 95
```

Storage statements: <BR />
`owner = msg.sender`  <BR />
`counter = start`

```
idx     bytecode    opcodes         stack               description

95      5b          JUMPDEST        [] 
96      61 015b     PUSH2 015b      [15b]               Push the contract code length
99      80          DUP1            [15b, 15b]
9a      61 00a4     PUSH2 00a4      [ a4, 15b, 15b]     Push the contract code offset within the 
                                                        bytecode stream

9d      60 00       PUSH1 00        [00, a4, 15b, 15b]  Push the memory offset where the code is to
                                                        be copied

9f      39          CODECOPY        [15b]               Copy the code to memory offset 00 from this 
                                                        code stream starting at offset a4, for a length 
                                                        of 15b
a0      60 00       PUSH1 00        [00, 15b]
a2      f3          RETURN          []                  Return the code to be deployed which is stored at 
                                                        memory offset 00 with length 15b.

a3      fe          INVALID                             INVALID marks end of initialization code.
                                                        Following this the contract code starts.
```

This code handles the case of a successful consturctor execution returning the smart contract code to be written on-chain.


<BR />

