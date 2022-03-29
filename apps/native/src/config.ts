import Constants from "expo-constants";
import { commonConfig } from "@crypto-koi/common/lib/commonConfig";

export const config = {
    ...commonConfig,
    imageUrl: Constants?.manifest?.extra?.API_URL + "/images",
    thumbnailUrl: Constants?.manifest?.extra?.API_URL + "/thumbnails",
    restApiBaseUrl: Constants?.manifest?.extra?.API_URL,
    graphqlBaseUrl: Constants?.manifest?.extra?.API_URL + "/query",
};
