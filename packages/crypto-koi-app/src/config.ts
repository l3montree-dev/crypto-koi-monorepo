import Constants from "expo-constants";

export const Config = {
    imageUrl: "http://192.168.2.133:8080/images",
    thumbnailUrl: "http://192.168.2.133:8080/thumbnails",
    restApiBaseUrl:
        // Constants?.manifest?.extra?.API_URL ??
        "http://192.168.2.133:8080/",
    graphqlBaseUrl:
        //(Constants?.manifest?.extra?.API_URL ??
        "http://192.168.2.133:8080" + "/query",

    secondsBetweenFeeding: 10 * 60,

    contractAddress: "0xab4B4C0C66dd33c165Cbd937f5c6F01a225b6099",

    chainUrl: "http://192.168.2.133:8545",
};
