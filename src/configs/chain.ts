import {Chain} from "wagmi";

const bscChain: Chain = {
    id: 0x38,
    name: 'Binance Smart Chain',
    network: 'bsc',
    nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
    },
    rpcUrls: {
        default: {
            http: ['https://bsc-dataseed.binance.org']
        },
    },
    blockExplorers: {
        default: { name: 'BSCScan', url: 'https://bscscan.com' },
    },
    testnet: false
}

const ethChain: Chain = {
    id: 0x1,
    name: 'Ethereum Mainnet',
    network: 'eth',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.ankr.com/eth']
        },
    },
    blockExplorers: {
        default: { name: 'etherscan', url: 'https://etherscan.io/' },
    },
    testnet: false
}

const gnosisChain: Chain = {
    id: 100,
    name: 'Gnosis',
    network: 'gnosis',
    nativeCurrency: {
        decimals: 18,
        name: 'xDai',
        symbol: 'XDAI',
    },
    rpcUrls: {
        default: {
            http: ['https://gnosischain-rpc.gateway.pokt.network']
        },
    },
    blockExplorers: {
        default: { name: 'BlockScout', url: 'https://blockscout.com/xdai/mainnet' },
    },
    testnet: false
}

const xProtocol: Chain = {
    id: 0x1869F,
    name: 'xProtocol Chain',
    network: 'ubc',
    nativeCurrency: {
        decimals: 18,
        name: 'UBC',
        symbol: 'UBC',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.syncchain.org'] //https://rpc.syncchain.org
        }
    },
    blockExplorers: {
        default: { name: 'UBCScan', url: 'https://scan.syncchain.org' },
    },
    testnet: false
}

export {
    bscChain,
    gnosisChain,
    ethChain,
    xProtocol
}