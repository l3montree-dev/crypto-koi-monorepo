import { BlurView } from "expo-blur";
import { observer } from "mobx-react-lite";
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
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { AppButton } from "./components/AppButton";
import CircularProgress from "./components/CircularProgress";
import Clock from "./components/Clock";
import SimpleClock from "./components/SimpleClock";
import useAppState from "./hooks/useAppState";
import { useFloating } from "./hooks/useFloating";
import { selectFirstCryptogotchi } from "./mobx/selectors";
import { DimensionUtils } from "./utils/DimensionUtils";

const style = StyleSheet.create({
    img: {
        width: 400,
        height: 400,
    },
    z1: {
        zIndex: 1,
    },
    dead: {
        tintColor: "black",
        opacity: 0.6,
    },
});

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const FriendsScreen = observer(() => {
    const tailwind = useTailwind();
    const { translateX, translateY } = useFloating();
    const cryptogotchi = useAppState(selectFirstCryptogotchi);

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
                        style={[
                            style.img,
                            !cryptogotchi?.isAlive && style.dead,
                        ]}
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
                {cryptogotchi && (
                    <BlurView intensity={0} style={tailwind("rounded-lg")}>
                        <View style={tailwind("flex-row py-2 px-4")}>
                            <View>
                                <CircularProgress
                                    progress={Math.max(
                                        cryptogotchi.food / 100,
                                        0
                                    )}
                                    backgroundStrokeColor={
                                        tailwind("text-amber-100")
                                            .color as string
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
                                    date={cryptogotchi.foodEmptyDate}
                                    style={tailwind(
                                        "text-white text-xs text-center mt-1"
                                    )}
                                    id="food-clock"
                                />
                            </View>
                            {/*<View style={tailwind("mx-4")}>
                                <CircularProgress
                                    progress={Math.max(
                                        cryptogotchi.fun / 100,
                                        0
                                    )}
                                    backgroundStrokeColor={
                                        tailwind("text-amber-100")
                                            .color as string
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
                                    date={cryptogotchi.funEmptyDate}
                                    style={tailwind(
                                        "text-white text-xs text-center mt-1"
                                    )}
                                    id="fun-clock"
                                />
                            </View>
                            <View>
                                <CircularProgress
                                    progress={Math.max(
                                        0,
                                        cryptogotchi.affection / 100
                                    )}
                                    backgroundStrokeColor={
                                        tailwind("text-amber-100")
                                            .color as string
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
                                    id="affection-clock"
                                    date={cryptogotchi.affectionEmptyDate}
                                    style={tailwind(
                                        "text-white text-xs text-center mt-1"
                                    )}
                                />
                                    </View>*/}
                        </View>
                    </BlurView>
                )}
            </View>
            <View style={tailwind("flex-col mx-4 justify-end")}>
                <View style={tailwind("flex-row justify-between")}>
                    <View style={tailwind("flex-row")}>
                        <Text style={tailwind("text-white text-3xl font-bold")}>
                            {cryptogotchi?.name}
                        </Text>
                        {!cryptogotchi?.isAlive && (
                            <Icon
                                name="grave-stone"
                                style={tailwind(
                                    "text-3xl text-white opacity-50 ml-2"
                                )}
                            />
                        )}
                    </View>

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

                {cryptogotchi && (
                    <>
                        <View style={tailwind("flex-row items-center")}>
                            <Icon
                                style={
                                    cryptogotchi.tokenId
                                        ? tailwind("text-2xl text-amber-500")
                                        : tailwind(
                                              "text-2xl text-white opacity-50"
                                          )
                                }
                                name={
                                    cryptogotchi.tokenId
                                        ? "shield-check"
                                        : "shield-off"
                                }
                            />
                            <Text style={tailwind("text-white ml-2")}>
                                #
                                {cryptogotchi.tokenId !== null
                                    ? cryptogotchi.tokenId + " (is valid NFT)"
                                    : cryptogotchi.getBase64Uuid + " (No NFT)"}
                            </Text>
                        </View>
                        <View style={tailwind("flex-row items-center")}>
                            <Icon
                                style={tailwind("text-2xl text-amber-500")}
                                name="information-outline"
                            />
                            <Text style={tailwind("text-white ml-2")}>
                                Age:
                            </Text>
                            {cryptogotchi.deathDate === null ? (
                                <Clock
                                    id="age-clock"
                                    style={tailwind("text-white ml-2")}
                                    date={cryptogotchi.createdAt}
                                />
                            ) : (
                                <Text style={tailwind("text-white ml-2")}>
                                    {cryptogotchi.deathDateString} (died:{" "}
                                    {cryptogotchi.deathDate.format(
                                        "DD.MM.YYYY HH:mm"
                                    )}
                                    )
                                </Text>
                            )}
                        </View>
                        <View style={tailwind(" mt-4 mb-4")}>
                            <AppButton
                                disabled={!cryptogotchi.isAlive}
                                style={tailwind("w-full")}
                                title="Feed"
                            />
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
});

export default FriendsScreen;
