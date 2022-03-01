import Constants from "expo-constants";

export const config = {
    imageUrl:
        (Constants?.manifest?.extra?.API_URL ?? "http://192.168.2.133:8080") +
        "/images",
    thumbnailUrl:
        (Constants?.manifest?.extra?.API_URL ?? "http://192.168.2.133:8080") +
        "/thumbnails",
    restApiBaseUrl:
        Constants?.manifest?.extra?.API_URL ?? "http://192.168.2.133:8080/",
    graphqlBaseUrl:
        (Constants?.manifest?.extra?.API_URL ?? "http://192.168.2.133:8080") +
        "/query",

    secondsBetweenFeeding: 10 * 60,

    contractAddress: "0xd9515715Cc7B326b802684Ec5c9FF3EaA2a2c3b6",

    chainUrl: "https://dev.geth.crypto-koi.io/rpc",
    chainId: 4,
};
