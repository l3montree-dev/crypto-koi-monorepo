import Constants from "expo-constants";
export const Config = {
    restApiBaseUrl:
        //Constants?.manifest?.extra?.API_URL ??
        "http://192.168.2.133:8080/",
    graphqlBaseUrl:
        // (Constants?.manifest?.extra?.API_URL ??
        "http://192.168.2.133:8080" + "/query",

    secondsBetweenFeeding: 10 * 60,
};
