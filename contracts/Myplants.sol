pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyPlants is ERC1155, Ownable {
    uint256 public constant ANNUALS = 0;
    uint256 public constant BULBS = 1;
    uint256 public constant CACTUS = 2;
    uint256 public constant CLIMBERS = 3;
    uint256 public constant ORCHIDS = 4;
    uint256 public constant TREES = 5;

    mapping(uint256 => string) private _uris;

    constructor()
        ERC1155(
            "https://bafybeiebnj5zfwgjhofrl3hvxkh34hm6d4mjs3grzohahlphb2elku3tda.ipfs.dweb.link"
        )
    {
        _mint(msg.sender, ANNUALS, 10, "");
        _mint(msg.sender, BULBS, 12, "");
        _mint(msg.sender, CACTUS, 1, "");
        _mint(msg.sender, CLIMBERS, 2, "");
        _mint(msg.sender, ORCHIDS, 1, "");
        _mint(msg.sender, TREES, 6, "");
    }

    function mint(uint256 amount, uint256 tokenId) public onlyOwner {
        _mint(msg.sender, tokenId, amount, "");
    }

    // Override the uri function in order to be compatible with opensea (more expensive)
    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_uris[tokenId]);
    }

    function setTokenUri(uint256 tokenId, string memory uri) public onlyOwner {
        require(bytes(_uris[tokenId]).length == 0, "Cannot set uri twice");
        _uris[tokenId] = uri;
    }
}
