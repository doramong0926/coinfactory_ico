export const erc20Abi = [
    {
        name: 'balanceOf',
        type: 'function',
        constant: true,
        payable: false,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
        ],
        outputs: [
            {
                name: 'balance',
                type: 'uint256',
            },
        ],
    },
    {
        name: 'transfer',
        type: 'function',
        constant: false,
        payable: false,
        inputs: [
            {
                name: '_to',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'success',
                type: 'bool',
            },
        ],
    },
  ];

export const abi=[
    {
        "constant":true,
        "inputs":[],
        "name":"rate",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },

    {
        "constant":true,
        "inputs":[
            {
                "name":"_beneficiary",
                "type":"address"
            }
        ],
        "name":"isWhitelisted",
        "outputs":[
            {
                "name":"","type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },

    {
        "constant":true,
        "inputs":[],
        "name":"startico",
        "outputs":[
            {
                "name":"","type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    
    {
        "constant":true,
        "inputs":[],
        "name":"weiRaised",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    
    {"constant":false,"inputs":[],"name":"returnTokenToWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"volumebounusA","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"capbounusC","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_volumebounusA","type":"uint256"},{"name":"_volumebounusB","type":"uint256"},{"name":"_volumebounusC","type":"uint256"}],"name":"setvolumebounus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Publisher","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"OwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"removeFromWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiaries","type":"address[]"}],"name":"addManyToWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newPublisher","type":"address"}],"name":"transferPublisher","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_capbounusA","type":"uint256"},{"name":"_capbounusB","type":"uint256"},{"name":"_capbounusC","type":"uint256"}],"name":"setcapbounus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"volumebounusB","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"capbounusA","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumamount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_startstop","type":"bool"}],"name":"startstopICO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"addToWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"volumebounusC","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"PublisherAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deleteThisContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"capbounusB","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_minimumamount","type":"uint256"}],"name":"setminimumAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_rate","type":"uint256"},{"name":"_wallet","type":"address"},{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_startico","type":"bool"}],"name":"ICOStatus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Publisher","type":"address"},{"indexed":true,"name":"newPublisher","type":"address"}],"name":"PublisherTransferred","type":"event"}
]