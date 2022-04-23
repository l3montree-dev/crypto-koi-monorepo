import React, { FunctionComponent } from "react";
import { Platform, View, StyleSheet, Image } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { CustomColors } from "../styles/colors";
import { DimensionUtils } from "../utils/DimensionUtils";

interface Props {
    inSafeAreaView: boolean;
}

const styleSheet = StyleSheet.create({
    image: {
        width: DimensionUtils.deviceWidth,
        height: DimensionUtils.deviceHeight,
    },
});

const GradientBackground: FunctionComponent<Props> = (props) => {
    return (
        <View pointerEvents={"none"}>
            {Platform.OS === "android" ? (
                <Svg
                    width={DimensionUtils.deviceWidth}
                    height={DimensionUtils.screenHeight}
                >
                    <Defs>
                        <LinearGradient
                            id="Gradient"
                            x1="0%"
                            y1={props.inSafeAreaView ? "10%" : "100"}
                            x2="200%"
                            y2={props.inSafeAreaView ? "150%" : "200%"}
                        >
                            <Stop
                                offset="0%"
                                stopColor={
                                    props.inSafeAreaView ? "#101A33" : "white"
                                }
                                stopOpacity={props.inSafeAreaView ? 1 : 0.05}
                            />
                            <Stop
                                offset="25%"
                                stopColor={CustomColors.bgDark}
                                stopOpacity="1"
                            />
                            <Stop
                                offset="500%"
                                stopColor={
                                    props.inSafeAreaView
                                        ? "#331019"
                                        : CustomColors.cherry
                                }
                                stopOpacity={
                                    props.inSafeAreaView ? "1" : "0.35"
                                }
                            />
                        </LinearGradient>
                    </Defs>
                    <Rect
                        x="0"
                        y="0"
                        width={DimensionUtils.deviceWidth}
                        height={DimensionUtils.screenHeight}
                        fill={"url(#Gradient)"}
                    />
                </Svg>
            ) : (
                <Image
                    style={styleSheet.image}
                    accessibilityIgnoresInvertColors
                    source={require("../../assets/image/background_gradient.png")}
                />
            )}
        </View>
    );
};

export default GradientBackground;
