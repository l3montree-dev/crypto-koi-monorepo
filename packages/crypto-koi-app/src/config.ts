import Constants from "expo-constants";

export const config = {
    imageUrl: "http://192.168.2.133:8080/images",
    thumbnailUrl: "http://192.168.2.133:8080/thumbnails",
    restApiBaseUrl:
        // Constants?.manifest?.extra?.API_URL ??
        "http://192.168.2.133:8080/",
    graphqlBaseUrl:
        //(Constants?.manifest?.extra?.API_URL ??
        "http://192.168.2.133:8080" + "/query",

    secondsBetweenFeeding: 10 * 60,

    contractAddress: "0x60d27fE16a09d6Cd0B06f788242A4A6d61C94928",

    chainUrl: "http://192.168.2.133:8545",
};
