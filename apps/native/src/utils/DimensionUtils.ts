import { Dimensions } from "react-native";

export class DimensionUtils {
    static deviceWidth = Dimensions.get("window").width;
    static deviceHeight = Dimensions.get("window").height;
    static screenHeight = Dimensions.get("screen").height;
}
