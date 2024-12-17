// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error NftIsNotApproved();
error PleaseSendCorreactPrice();
error NFT_alreadyListed();
error TransferFailed();

contract FoodTraceabilityMarketplace is ReentrancyGuard {
    struct UserAccount {
        string name;
        string email;
        uint256 phone_number;
        string role;
        bool isRegister;
    }

    struct items {
        address farmer;
        address payable seller;
        address nftContract;
        uint256 tokenId;
        uint256 basePrice;
        address highestBidder;
        uint256 highestBid;
        uint256 endTime;
        uint256 starTime;
        uint256 mintTime;
        string sallerRole;
        bool isAuction;
        bool isListedOnSale;
    }

    struct BuyHistory {
        address buyer;
        uint256 price;
        uint256 timestamp;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    uint256 public ListdItems;
    uint256 public totalItemsSale;

    mapping(uint256 => items) public listedItemDetails;
    mapping(address => UserAccount) public registerationAccount;
    mapping(uint256 => BuyHistory[]) public nftBuyHistory;

    modifier isRegisters() {
        require(isUser(msg.sender), "You have to register your self");
        _;
    }

    IERC721 public NFTContract;

    constructor(address _nft) {
        NFTContract = IERC721(_nft);
    }

    function registerAsUser(
        string memory _name,
        string memory _email,
        uint256 _phone_number,
        string memory _role
    ) public {
        require(!isUser(msg.sender), "You are already registered");
        registerationAccount[msg.sender] = UserAccount(
            _name,
            _email,
            _phone_number,
            _role,
            true
        );
    }

    function isUser(address _address) public view returns (bool) {
        return registerationAccount[_address].isRegister;
    }

    function sellItem(
        uint256 _itemId,
        uint256 _price,
        uint256 _endTime,
        bool _isAuction
    ) public isRegisters {
        items storage Items = listedItemDetails[_itemId];

        if (Items.isListedOnSale == true) {
            revert NFT_alreadyListed();
        }

        if (NFTContract.getApproved(Items.tokenId) != address(this)) {
            revert NftIsNotApproved();
        }

        if (_isAuction) {
            Items.endTime = _endTime;
            Items.starTime = block.timestamp;
            Items.isAuction = _isAuction;
        }
        Items.seller = payable(msg.sender);
        Items.basePrice = _price;
        Items.isListedOnSale = true;

        emit ItemListed(msg.sender, Items.nftContract, Items.tokenId, _price);
    }

    function buyItem(uint256 _itemId) public payable {
        items storage Items = listedItemDetails[_itemId];

        if (msg.value < Items.basePrice) {
            revert PleaseSendCorreactPrice();
        }
        (bool success, ) = payable(Items.seller).call{value: msg.value}("");
        if (!success) {
            revert TransferFailed();
        }

        NFTContract.safeTransferFrom(Items.seller, msg.sender, Items.tokenId);

        Items.sallerRole = registerationAccount[msg.sender].role;
        Items.seller = payable(msg.sender);
        Items.basePrice = 0;
        Items.highestBidder = address(0);
        Items.highestBid = 0;
        Items.endTime = 0;
        Items.starTime = 0;
        Items.isAuction = false;
        Items.isListedOnSale = false;

        nftBuyHistory[Items.tokenId].push(
            BuyHistory(msg.sender, msg.value, block.timestamp)
        );

        emit ItemBought(
            msg.sender,
            Items.nftContract,
            Items.tokenId,
            Items.basePrice
        );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// Items SECTION ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    function createItems(
        uint256 _tokenId,
        uint256 _basePrice,
        uint256 _endTime
    ) public isRegisters {
        if (NFTContract.getApproved(_tokenId) != address(this)) {
            revert NftIsNotApproved();
        }

        ListdItems++;

        listedItemDetails[ListdItems] = items(
            msg.sender,
            payable(msg.sender),
            address(NFTContract),
            _tokenId,
            _basePrice,
            address(0),
            0,
            _endTime,
            block.timestamp,
            block.timestamp,
            registerationAccount[msg.sender].role,
            true,
            true
        );

        emit ItemListed(msg.sender, address(NFTContract), _tokenId, _basePrice);
    }

    function bid(uint256 _itemId) public payable nonReentrant isRegisters {
        items storage Items = listedItemDetails[_itemId];

        require(Items.isAuction, "This item not listed on auction");

        require(block.timestamp < Items.endTime, "Item has ended");

        require(Items.seller != address(0), "Item does not exist");

        require(
            Items.highestBid < msg.value && Items.basePrice <= msg.value,
            "Bid must be higher than the current highest bid and base price"
        );

        require(msg.sender != Items.seller, "You cannot bid in your own Items");

        address payable prevBidder = payable(Items.highestBidder);

        if (prevBidder != address(0)) {
            (bool success, ) = prevBidder.call{value: Items.highestBid}("");
            require(success, "Failed to refund previous bidder");
        }

        Items.highestBid = msg.value;
        Items.highestBidder = payable(msg.sender);
    }

    function _checkItemsStatus(uint256 _itemId) public view returns (bool) {
        items memory Items = listedItemDetails[_itemId];
        require(Items.isListedOnSale, "Items for this NFT is not in progress");
        return (block.timestamp > Items.endTime);
    }

    function cancellItems(uint256 _itemId) public isRegisters {
        items memory Items = listedItemDetails[_itemId];

        require(msg.sender == Items.seller, "You are not Owner of this NFT");

        require(Items.endTime < block.timestamp, "Items Time remaining");

        Items.isListedOnSale = false;

        Items.isAuction = false;

        listedItemDetails[_itemId] = Items;
    }

    function concludeItems(uint256 _itemId) public isRegisters {
        items memory Items = listedItemDetails[_itemId];

        require(
            msg.sender == Items.highestBidder || msg.sender == Items.seller,
            "You are not authorized to conclude the Items"
        );

        require(Items.endTime < block.timestamp, "Items Time remaining");

        NFTContract.transferFrom(Items.seller, msg.sender, Items.tokenId);

        address payable prevSeller = payable(Items.seller);

        if (prevSeller != address(0)) {
            (bool success, ) = prevSeller.call{value: Items.highestBid}("");
            require(success, "Failed to refund previous bidder");
        }

        uint256 bidSale = Items.highestBid;

        Items.sallerRole = registerationAccount[Items.highestBidder].role;
        Items.seller = payable(Items.highestBidder);
        Items.basePrice = 0;
        Items.highestBidder = address(0);
        Items.highestBid = 0;
        Items.endTime = 0;
        Items.starTime = 0;
        Items.isAuction = false;
        Items.isListedOnSale = false;

        totalItemsSale++;

        listedItemDetails[_itemId] = Items;

        nftBuyHistory[Items.tokenId].push(
            BuyHistory(msg.sender, bidSale, block.timestamp)
        );

        emit ItemBought(
            msg.sender,
            address(NFTContract),
            Items.tokenId,
            Items.highestBid
        );
    }

    function getBuyHistory(
        uint256 nftId
    ) public view returns (BuyHistory[] memory) {
        return nftBuyHistory[nftId];
    }
}
