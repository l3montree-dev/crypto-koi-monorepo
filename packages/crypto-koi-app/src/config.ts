import Constants from "expo-constants";

export const config = {
    imageUrl: Constants?.manifest?.extra?.API_URL + "/images",
    thumbnailUrl: Constants?.manifest?.extra?.API_URL + "/thumbnails",
    restApiBaseUrl: Constants?.manifest?.extra?.API_URL,
    graphqlBaseUrl: Constants?.manifest?.extra?.API_URL + "/query",

    secondsBetweenFeeding: 10 * 60,

    contractAddress: "0xd9515715Cc7B326b802684Ec5c9FF3EaA2a2c3b6",

    chainUrl: "https://dev.geth.crypto-koi.io/rpc",
    chainId: 4,
};
