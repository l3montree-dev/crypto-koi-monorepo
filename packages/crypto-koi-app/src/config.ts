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

    contractAddress: "0x5Dae42c07Cf5805c22162346dae8B8FD8dcea46C",

    chainUrl: "http://192.168.2.133:8545",
};
