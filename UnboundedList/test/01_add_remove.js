//==========================================================
// Author: Alexander Zammit
// Date: 18th May 2020
// LinkedIn: https://www.linkedin.com/in/alexzammit/
//
// This code is documented in the article:
//
// Designing an Unbounded List in Solidity
// http://www.BlockchainThings.io/
//
//==========================================================

const ListContract = artifacts.require("ListContract")
const truffleAssert = require('truffle-assertions')

contract('Testing Adding/Removing List Items', function (accounts) {

    const addWrapper =  async (list, addr) => {
        let recpt = await list.add(addr)
        truffleAssert.eventEmitted(recpt, 'EventItemAdded', (ev) => {
            console.log('Item Added: Id: ' + ev.id + ', Data: ' + ev.addr)
            return true
        })
    }
    
    const removeWrapper = async (list, id) => {
        let recpt = await list.remove(id)
        truffleAssert.eventEmitted(recpt, 'EventItemDeleted', (ev) => {
            console.log('Item Removed: Id: ' + ev.id + ', Data: ' + ev.addr)
            return true
        })
    }
    
    it('Should add/remove items', async () => {
        let list = await ListContract.deployed()
    
        await addWrapper(list, '0x0000000000000000000000000000000000000001')
        await addWrapper(list, '0x0000000000000000000000000000000000000002')
        await addWrapper(list, '0x0000000000000000000000000000000000000003')
        await addWrapper(list, '0x0000000000000000000000000000000000000004')
        await addWrapper(list, '0x0000000000000000000000000000000000000005')

        console.log('First Item Id ' + await list.firstItem())
        console.log('Last Item Id  ' + await list.lastItem())
        console.log('Next Item Id  ' + await list.nextItem())
        console.log('Total Items   ' + await list.totalItems())
        console.log();

        await removeWrapper(list, 1)
        await removeWrapper(list, 3)
        await removeWrapper(list, 5)

        console.log('First Item Id ' + await list.firstItem())
        console.log('Last Item Id  ' + await list.lastItem())
        console.log('Next Item Id  ' + await list.nextItem())
        console.log('Total Items   ' + await list.totalItems())
        console.log();

        let total = await list.totalItems()
        assert(total == 2, "Unexpected total items")
    })
    
})
