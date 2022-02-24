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

    contractAddress: "0xa3F9150c6b8280c08Da579F8c13E3B5CBD7E9465",

    chainUrl: "http://192.168.2.133:8545",
};
