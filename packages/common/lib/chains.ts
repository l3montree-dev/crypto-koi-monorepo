export const mumbai = {
    name: "Mumbai",
    title: "Polygon Testnet Mumbai",
    chain: "Polygon",
    rpc: [
        "https://matic-mumbai.chainstacklabs.com",
        "https://rpc-mumbai.maticvigil.com",
        "https://matic-testnet-archive-rpc.bwarelabs.com",
    ],
    faucets: ["https://faucet.polygon.technology/"],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    infoURL: "https://polygon.technology/",
    shortName: "maticmum",
    chainId: "0x" + (80001).toString(16),
    networkId: 80001,
    explorers: [
        {
            name: "polygonscan",
            url: "https://mumbai.polygonscan.com",
            standard: "EIP3091",
        },
    ],
};

export const mainnet = {
    name: "Polygon Mainnet",
    chain: "Polygon",
    rpc: [
        "https://polygon-rpc.com/",
        "https://rpc-mainnet.matic.network",
        "https://matic-mainnet.chainstacklabs.com",
        "https://rpc-mainnet.maticvigil.com",
        "https://rpc-mainnet.matic.quiknode.pro",
        "https://matic-mainnet-full-rpc.bwarelabs.com",
    ],
    faucets: [],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    infoURL: "https://polygon.technology/",
    shortName: "MATIC",
    chainId: "0x" + (137).toString(16),
    networkId: 137,
    slip44: 966,
    explorers: [
        {
            name: "polygonscan",
            url: "https://polygonscan.com",
            standard: "EIP3091",
        },
    ],
};
