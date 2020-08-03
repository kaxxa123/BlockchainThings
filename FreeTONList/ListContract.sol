pragma solidity ^0.6.0;

//==========================================================
// Author: Alexander Zammit
// Date: 30th July 2020
// LinkedIn: https://www.linkedin.com/in/alexzammit/
//
// This code is being used to test the Free TON Solidity Compiler
// Refer to articles:
// http://blockchainthings.io/article.aspx?i=7
// http://blockchainthings.io/article.aspx?i=5
//
// Also related is this article:
// Designing an Unbounded List in Solidity
// http://blockchainthings.io/article.aspx?i=4
//
// Compilation command:
// tondev sol ListContract.sol -l js -L deploy
//==========================================================

contract ListContract {

    struct ListElement {
        uint256 prev;           //Previous list item pointer
        uint256 next;           //Next list item pointer
        address addr;           //Item data
    }

    uint256 public nextItem;    //Id of next Item to be created, Ids are assigned sequentially
    uint256 public totalItems;  //Number of listed Items

    //Item storage. id => ListElement
    mapping(uint256 => ListElement) private items;

    //Events
    event EventItemAdded(uint256 indexed id, address addr);
    event EventItemDeleted(uint256 indexed id, address addr);

    // Modifier that allows public function to accept all external calls.
    // Related References:
    // https://docs.ton.dev/86757ecb2/p/00f1c7-managing-gas-in-ton/t/82e97f
    // https://docs.ton.dev/86757ecb2/p/7627c4-using-runlocal
    modifier alwaysAccept {
        tvm.accept();
        _;
    }

    /// @dev Initializes ListContract
    constructor() public {
        tvm.accept();

        //Id zero is reserved.
        //First item to be created will have id 1
        nextItem = 1;
        totalItems = 0;
        items[0] = ListElement(0,0,address(0x0));
    }

    /// @dev Add list item.
    /// @param addr list item data
    function add(address addr) external alwaysAccept {
        //Validate item data
        require(addr != address(0x0), 101, "Address cannot be zero");

        items[lastItem()].next = nextItem;
        items[nextItem] = ListElement(lastItem(), 0, addr);

        lastItemSet(nextItem);
        nextItem += 1;
        totalItems += 1;

        emit EventItemAdded(lastItem(), addr);
    }

    /// @dev Remove list item with given id
    /// @param id element to be removed
    function remove(uint256 id) external alwaysAccept {
        (bool exists, ListElement elem) = items.fetch(id);

        //Make sure we are deleting a valid item
        //Note this will also block deleting the root node (id == 0)
        require(exists && (elem.addr != address(0x0)), 201, "Uninitialized Item cannot be deleted");

        //Add log for deleted item
        emit EventItemDeleted(id, elem.addr);

        //Update the previous list entry
        items[elem.prev].next = elem.next;

        //If deleted elem was the list tail than update lastItem
        //to point at the prev element
        if (elem.next == 0) {
            lastItemSet(elem.prev);
        }
        else {
            items[elem.next].prev = elem.prev;
        }

        //Delete element
        delete items[id];
        totalItems -= 1;
    }

    /// @dev Update list item with given id
    /// @param id element to be updated
    function update(uint256 id, address addr) external alwaysAccept {
        //Validate new item data
        require(addr != address(0x0), 101, "Address cannot be zero");

        //Validate id is pointing to a valid list item element
        (bool exists, ListElement elem) = items.fetch(id);
        require(exists && (elem.addr != address(0x0)), 101, "Uninitialized Item cannot be updated");

        //Update item data
        items[id].addr = addr;
    }

    /// @dev Reads up to <toRead> items starting from the element with id start
    /// It is up to the caller to make sure that he doesn't ask for too many
    /// items such that to run out of memory
    /// @param start specify the starting id for reading items. start = 0 => list head
    /// @param toRead number of items to read. toRead = 0 => read all items up to the end
    /// @return addrList - an array of item data, next - next reading position (next == 0 indicates we reached the list end)
    function read(uint256 start, uint256 toRead) external view returns (address[] addrList, uint256 next) {

        //start = 0 => list head
        uint256 itemPos;
        if (start == 0)
             itemPos = firstItem();
        else itemPos = start;

        //Cater for the special case where the list is empty
        if (itemPos == 0)
            return (new address[](0), 0);

        //Validate reading position
        //This can happen if an item is deleted while traversing the list
        (bool exists, ListElement elem) = items.fetch(itemPos);
        require(exists && (elem.addr != address(0x0)), 101, "Uninitialized Item cannot be updated");

        //Determine number of elements to be returned
        //We count until:
        // Hitting the root OR
        // toRead elements are traversed
        uint256 size = 0;
        while ((itemPos != 0) && ((toRead == 0) || (size < toRead))) {
           size += 1;
           itemPos = items[itemPos].next;
        }

        //Return requested items
        addrList = new address[](size);

        if (start == 0)
             itemPos = firstItem();
        else itemPos = start;

        uint256 arrayPos;
        while (arrayPos < size) {
           addrList[arrayPos] = items[itemPos].addr;

           arrayPos += 1;
           itemPos = items[itemPos].next;
        }

        next = itemPos;

        return (addrList, next);
    }

    /// @dev Get id of first item in list
    /// @return id of first item
    function firstItem() public view returns (uint256) {
        return items[0].next;
    }

    /// @dev Get id of last item in list
    /// @return id of last item
    function lastItem() public view returns (uint256) {
        return items[0].prev;
    }

    /// @dev Set id of last item added
    /// @param id id value to set
    function lastItemSet(uint256 id) private {
        items[0].prev = id;
    }
}
