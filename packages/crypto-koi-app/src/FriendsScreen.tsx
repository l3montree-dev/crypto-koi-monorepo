import { BlurView } from "expo-blur";
import moment from "moment";
import React from "react";
import {
    Animated,
    Animated as RNAnimated,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import Svg, { Circle, Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { AppButton } from "./components/AppButton";
import CircularProgress from "./components/CircularProgress";
import Clock from "./components/Clock";
import SimpleClock from "./components/SimpleClock";
import { useFloating } from "./hooks/useFloating";
import { DimensionUtils } from "./utils/DimensionUtils";

const style = StyleSheet.create({
    img: {
        width: 400,
        height: 400,
    },
    z1: {
        zIndex: 1,
    },
});

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const HomeScreen = () => {
    const tailwind = useTailwind();
    const { translateX, translateY } = useFloating();

    return (
        <SafeAreaView style={tailwind("flex-1 flex-col")}>
            <View
                style={tailwind(
                    "flex-row text-amber-500 absolute bottom-0 w-full h-56 justify-center"
                )}
            ></View>
            <View
                style={tailwind(
                    "flex-row text-amber-500 absolute bottom-0 w-full h-56 justify-center"
                )}
            >
                <Svg
                    style={tailwind("text-violet-900")}
                    width={DimensionUtils.deviceWidth}
                    height={500}
                >
                    <AnimatedEllipse
                        rx={500}
                        ry={200}
                        cx="200"
                        cy="200"
                        fill={"currentColor"}
                    />
                </Svg>
            </View>
            <View style={tailwind("flex-1 mt-40")}>
                <RNAnimated.View style={[{ translateX, translateY }, style.z1]}>
                    <Image
                        style={style.img}
                        resizeMode="contain"
                        source={require("../assets/image/cg-3.png")}
                    />
                </RNAnimated.View>
                <View style={tailwind("flex-row relative justify-center")}>
                    <Svg width={150} height={75}>
                        <AnimatedEllipse
                            rx={Animated.diffClamp(
                                Animated.multiply(translateY, -1),
                                50,
                                75
                            )}
                            ry={10}
                            cx="75"
                            cy="25"
                            fill="rgba(0,0,0,0.2)"
                        />
                    </Svg>
                </View>
            </View>
            <View
                style={[
                    tailwind(
                        "flex-row absolute left-0 right-0 justify-center top-16"
                    ),
                    style.z1,
                ]}
            >
                <BlurView intensity={75} style={tailwind("rounded-lg")}>
                    <View style={tailwind("flex-row py-2 px-4")}>
                        <View>
                            <CircularProgress
                                progress={0.6}
                                backgroundStrokeColor={
                                    tailwind("text-amber-100").color as string
                                }
                                radius={25}
                                svgStyle={tailwind("text-amber-500")}
                                strokeWidth={6}
                            >
                                <View
                                    style={tailwind(
                                        "flex-row flex-1 justify-center items-center"
                                    )}
                                >
                                    <Icon
                                        style={tailwind(
                                            "text-amber-100 text-2xl"
                                        )}
                                        name="food-apple"
                                    />
                                </View>
                            </CircularProgress>

                            <SimpleClock
                                date={moment().add(1, "hour")}
                                style={tailwind(
                                    "text-white text-xs text-center mt-1"
                                )}
                            />
                        </View>
                        <View style={tailwind("mx-4")}>
                            <CircularProgress
                                progress={0.6}
                                backgroundStrokeColor={
                                    tailwind("text-amber-100").color as string
                                }
                                radius={25}
                                svgStyle={tailwind("text-amber-500")}
                                strokeWidth={6}
                            >
                                <View
                                    style={tailwind(
                                        "flex-row flex-1 justify-center items-center"
                                    )}
                                >
                                    <Icon
                                        style={tailwind(
                                            "text-amber-100 text-2xl"
                                        )}
                                        name="gamepad-variant-outline"
                                    />
                                </View>
                            </CircularProgress>
                            <SimpleClock
                                date={moment().add(0.6, "hour")}
                                style={tailwind(
                                    "text-white text-xs text-center mt-1"
                                )}
                            />
                        </View>
                        <View>
                            <CircularProgress
                                progress={0.6}
                                backgroundStrokeColor={
                                    tailwind("text-amber-100").color as string
                                }
                                radius={25}
                                svgStyle={tailwind("text-amber-500")}
                                strokeWidth={6}
                            >
                                <View
                                    style={tailwind(
                                        "flex-row flex-1 justify-center items-center"
                                    )}
                                >
                                    <Icon
                                        style={tailwind(
                                            "text-amber-100 text-2xl"
                                        )}
                                        name="heart"
                                    />
                                </View>
                            </CircularProgress>
                            <SimpleClock
                                date={moment().add(0.8, "hour")}
                                style={tailwind(
                                    "text-white text-xs text-center mt-1"
                                )}
                            />
                        </View>
                    </View>
                </BlurView>
            </View>
            <View style={tailwind("flex-col mx-4 justify-end")}>
                <View style={tailwind("flex-row justify-between")}>
                    <Text style={tailwind("text-white text-3xl font-bold")}>
                        Tabito
                    </Text>
                    <View style={tailwind("rounded-lg overflow-hidden")}>
                        <TouchableNativeFeedback
                            style={tailwind("rounded-full")}
                            onPress={() => console.log("Hello")}
                        >
                            <View
                                style={tailwind(
                                    "p-1 w-10 flex-row items-center justify-center h-10 flex-row"
                                )}
                            >
                                <Icon
                                    style={tailwind("text-white text-2xl ")}
                                    name="dots-horizontal"
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>

                <View style={tailwind("flex-row items-center")}>
                    <Icon
                        style={tailwind("text-2xl text-amber-500")}
                        name="shield-check"
                    />
                    <Text style={tailwind("text-white ml-2")}>
                        #3m83kuf4 (is valid NFT)
                    </Text>
                </View>
                <View style={tailwind("flex-row items-center")}>
                    <Icon
                        style={tailwind("text-2xl text-amber-500")}
                        name="information-outline"
                    />
                    <Text style={tailwind("text-white ml-2")}>Age:</Text>
                    <Clock
                        style={tailwind("text-white ml-2")}
                        date={moment().subtract(5, "d")}
                    />
                </View>
                <View style={tailwind(" mt-4 mb-4")}>
                    <AppButton style={tailwind("w-full")} title="Feed" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
