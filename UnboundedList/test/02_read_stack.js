const ListContract = artifacts.require("ListContract")
const truffleAssert = require('truffle-assertions');

contract('Testing List read', function (accounts) {

    beforeEach( () => {
        console.log();
        console.log("Running new test...");
    });

    var addrList = new Array();

    const addWrapper =  async (list, addr) => {
        let recpt = await list.add(addr)
        truffleAssert.eventEmitted(recpt, 'EventItemAdded', (ev) => {
            console.log('Item Added: Id: ' + ev.id + ', Data: ' + ev.addr)
            addrList.push(ev.addr)
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
    
    const pagedRead = async (list, pagesz, extra) => {

        let stack = new Array();
        let next = await list.firstItem();
        let rdCount = 0;
        let bkCount = 0;

        //Read addresses using given page size
        do {
            if (extra) {
                await extra(rdCount, bkCount, next)
            }

            try {
                rdCount += 1;

                console.log("Reading from: " + next);
                let ret = await list.read(next, pagesz);

                let prev = next;
                next = ret.next;

                ret.next = prev;
                stack.push(ret);
            }
            catch (err) {
                ++bkCount;

                if (!err.message.includes('Invalid reading position'))
                    assert(false, "Unexpected error: " + err.message);

                //back track to try and get a correct page start
                if (stack.length == 0)
                    next = await list.firstLoan();
                else {
                    let bkRet = stack.pop();
                    next = bkRet.next;
                }
            }

        } while (next != 0)

        //flatten the address list
        var flat = new Array();

        stack.every((value, index) => {
            flat = flat.concat(value.addrList);
            return true;
        });

        return flat;
    }

    it('should add 17 list entries', async () => {
        let list = await ListContract.deployed()

        await addWrapper(list, '0x0000000000000000000000000000000000000001')
        await addWrapper(list, '0x0000000000000000000000000000000000000002')
        await addWrapper(list, '0x0000000000000000000000000000000000000003')
        await addWrapper(list, '0x0000000000000000000000000000000000000004')
        await addWrapper(list, '0x0000000000000000000000000000000000000005')
        await addWrapper(list, '0x0000000000000000000000000000000000000006')
        await addWrapper(list, '0x0000000000000000000000000000000000000007')
        await addWrapper(list, '0x0000000000000000000000000000000000000008')
        await addWrapper(list, '0x0000000000000000000000000000000000000009')
        await addWrapper(list, '0x000000000000000000000000000000000000000a')
        await addWrapper(list, '0x000000000000000000000000000000000000000b')
        await addWrapper(list, '0x000000000000000000000000000000000000000c')
        await addWrapper(list, '0x000000000000000000000000000000000000000d')
        await addWrapper(list, '0x000000000000000000000000000000000000000e')
        await addWrapper(list, '0x000000000000000000000000000000000000000f')
        await addWrapper(list, '0x0000000000000000000000000000000000000010')
        await addWrapper(list, '0x0000000000000000000000000000000000000011')

        let total = await list.totalItems()
        assert(total == 17, "Unexpected total items")
    });

    it('should read list using page sizes from 1 to 17', async () => {
        let list = await ListContract.deployed()

        for (pagesz = 1; pagesz < 18; ++pagesz) {
            let flat = await pagedRead(list, pagesz)

            //compare the output list with expected list
            assert((addrList.length === flat.length) && 
                    addrList.every((value, index) => value === flat[index]),
                    "Unexpected mistmatch in address list when page size is: " + pagesz);

        }
    });

    it('should read list despite interleaving deletions', async () => {
        let list = await ListContract.deployed()

        let doDel = async(rdCount, bkCount, next) => {
            //insert deletions to cause failures
            if ((bkCount == 0) && (next == 10)) {
                bDel = false;
                await removeWrapper(list, 10)
                await removeWrapper(list, 7)

                addrList.splice(10-1,1);
                addrList.splice(7-1,1);
            }
        }

        let flat = await pagedRead(list, 3, doDel)

        //compare the output list with expected list
        assert((addrList.length === flat.length) && 
        addrList.every((value, index) => value === flat[index]),
        "Unexpected mistmatch in address list when page size is: " + pagesz);
    });
});
