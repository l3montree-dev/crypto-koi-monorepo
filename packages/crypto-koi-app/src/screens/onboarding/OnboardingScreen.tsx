import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Animated as RNAnimated,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../../components/AppButton";
import Wave from "../../components/Wave";
import { useFloating } from "../../hooks/useFloating";
import { authService } from "../../services/AuthService";
import { userService } from "../../services/UserService";
import { Colors } from "../../styles/colors";
import { DimensionUtils } from "../../utils/DimensionUtils";
import Constants from "expo-constants";

const style = StyleSheet.create({
    slide: {
        width: DimensionUtils.deviceWidth,
        flex: 1,
    },
    dot: {
        height: 10,
        width: 10,
    },
    svg: {
        height: DimensionUtils.deviceWidth,
        width: DimensionUtils.deviceWidth,
    },
    rotatedSvg: {
        transform: [{ rotate: "180deg" }],
    },
    img: {
        // maxHeight: 400,
        width: 200,
        height: 400,

        aspectRatio: 1,
        top: 0,
        // ackgroundColor: "red",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    listItem: {
        backgroundColor: "rgba(255,255,255,0.2)",
    },
});

function OnboardingScreen() {
    const [activeSlide, setActiveSlide] = useState(0);

    const scrollPosition = useSharedValue(0);

    const animatedActiveDotStyle = useAnimatedStyle(() => {
        "worklet";
        return {
            transform: [
                {
                    translateX: withSpring(
                        (scrollPosition.value /
                            (DimensionUtils.deviceWidth * 3)) *
                            79
                    ),
                },
            ],
        };
    });

    const onPlayPress = () => {
        userService.loginUsingDeviceId(Constants.installationId);
    };

    const setActive = (next: number, x: number) => {
        setActiveSlide(next);
        scrollPosition.value = x;
    };

    const scrollViewRef = useRef<ScrollView>(null);
    const scrollHandler = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
        setActive(
            Math.floor(
                ev.nativeEvent.contentOffset.x / DimensionUtils.deviceWidth
            ),
            ev.nativeEvent.contentOffset.x
        );
    };
    const tailwind = useTailwind();

    const handleBack = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: Math.max(0, (activeSlide - 1) * DimensionUtils.deviceWidth),
                y: 0,
                animated: true,
            });
        }
    };

    const handleNext = () => {
        if (activeSlide === 2) {
            return onPlayPress();
        }
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: (activeSlide + 1) * DimensionUtils.deviceWidth,
                y: 0,
                animated: true,
            });
        }
    };

    const { translateX, translateY } = useFloating();

    const opacity = useMemo(() => ({ opacity: activeSlide > 0 ? 1 : 0.5 }), [
        activeSlide,
    ]);

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(Colors.bgColorVariant);
    }, []);

    return (
        <View style={tailwind("flex-1 bg-purple-700")}>
            <View style={tailwind("absolute top-0")}>
                <Wave
                    svgStyle={[
                        style.svg,
                        tailwind("text-violet-900"),
                        style.rotatedSvg,
                    ]}
                />
            </View>
            <ScrollView
                decelerationRate={"fast"}
                pagingEnabled={true}
                ref={scrollViewRef}
                scrollEnabled={false}
                style={tailwind("flex-1")}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >
                <View style={[style.slide, tailwind("mt-20 flex-1")]}>
                    <View>
                        <RNAnimated.View style={{ translateX, translateY }}>
                            <Image
                                style={style.img}
                                resizeMode="contain"
                                source={require("../../../assets/image/cg-3.png")}
                            />
                        </RNAnimated.View>
                    </View>
                    <Text
                        style={tailwind(
                            "text-white mt-10 text-4xl font-bold text-center"
                        )}
                    >
                        Welcome
                    </Text>
                    <Text
                        style={tailwind(
                            "text-white text-lg mt-5 px-10 text-center"
                        )}
                    >
                        Travel and have fun with your best friends
                    </Text>
                </View>
                <View
                    style={[
                        style.slide,
                        tailwind("flex-1 px-4 justify-center"),
                    ]}
                >
                    {activeSlide === 1 && (
                        <>
                            <Animated.Text
                                entering={FadeIn}
                                style={tailwind(
                                    "text-white text-4xl font-bold text-center mb-5"
                                )}
                            >
                                Keep your friend alive
                            </Animated.Text>
                            <Animated.View
                                style={[
                                    style.listItem,
                                    tailwind(
                                        "flex-row mx-0 my-2 py-3 px-4 rounded-lg items-center"
                                    ),
                                ]}
                                entering={FadeIn.delay(500)}
                            >
                                <Icon
                                    style={tailwind("text-4xl text-amber-500")}
                                    name="food-apple"
                                />

                                <View style={tailwind("ml-5")}>
                                    <Text
                                        style={tailwind("text-white text-lg")}
                                    >
                                        Feed your friend
                                    </Text>
                                    <Text
                                        style={tailwind(
                                            "text-white opacity-75"
                                        )}
                                    >
                                        Every few hours
                                    </Text>
                                </View>
                            </Animated.View>
                            <Animated.View
                                style={[
                                    style.listItem,
                                    tailwind(
                                        "flex-row mx-0 px-4 py-3 my-2 rounded-lg items-center"
                                    ),
                                ]}
                                entering={FadeIn.delay(1000)}
                            >
                                <Icon
                                    style={tailwind("text-4xl text-amber-500")}
                                    name="gamepad-variant-outline"
                                />
                                <View style={tailwind("ml-5")}>
                                    <Text
                                        style={tailwind("text-white text-lg")}
                                    >
                                        Play with him
                                    </Text>
                                    <Text
                                        style={tailwind(
                                            "text-white opacity-75"
                                        )}
                                    >
                                        Every few hours
                                    </Text>
                                </View>
                            </Animated.View>
                            <Animated.View
                                style={[
                                    style.listItem,
                                    tailwind(
                                        "flex-row mx-0 my-2 px-4 py-3 rounded-lg items-center"
                                    ),
                                ]}
                                entering={FadeIn.delay(1500)}
                            >
                                <Icon
                                    style={tailwind("text-4xl text-amber-500")}
                                    name="heart"
                                />
                                <View style={tailwind("ml-5")}>
                                    <Text
                                        style={tailwind("text-white text-lg")}
                                    >
                                        Cuddle with him
                                    </Text>
                                    <Text
                                        style={tailwind(
                                            "text-white opacity-75"
                                        )}
                                    >
                                        Every few hours
                                    </Text>
                                </View>
                            </Animated.View>
                        </>
                    )}
                </View>
                <View
                    style={[
                        style.slide,
                        tailwind(
                            "flex-col flex-1 justify-center px-4 items-center"
                        ),
                    ]}
                >
                    {activeSlide === 2 && (
                        <Animated.View entering={FadeIn}>
                            <Text
                                style={tailwind(
                                    "text-white text-4xl font-bold text-center mb-5"
                                )}
                            >
                                Make it an NFT
                            </Text>
                            <Text
                                style={tailwind(
                                    "text-white text-lg text-center"
                                )}
                            >
                                To never loose your friend again you can make
                                him unique by putting him in an NFT
                            </Text>
                            <View style={tailwind("mt-5")}>
                                <AppButton onPress={onPlayPress} title="Play" />
                            </View>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>

            <View style={tailwind("absolute -bottom-20")}>
                <Wave svgStyle={[style.svg, tailwind("text-violet-900")]} />
            </View>

            <View style={tailwind("flex-row items-center justify-between")}>
                <TouchableNativeFeedback onPress={handleBack}>
                    <View style={tailwind("px-10 rounded-lg m-2 py-4")}>
                        <Text style={[tailwind("text-white"), opacity]}>
                            Back
                        </Text>
                    </View>
                </TouchableNativeFeedback>

                <View style={tailwind("flex-row")}>
                    {[0, 1, 2].map((_, index) => (
                        <View
                            key={index}
                            style={[
                                tailwind("bg-violet-400 mx-2 rounded"),
                                style.dot,
                            ]}
                        />
                    ))}
                    <Animated.View
                        style={[
                            style.dot,
                            tailwind("bg-violet-200 rounded absolute mx-2"),
                            animatedActiveDotStyle,
                        ]}
                    />
                </View>
                <TouchableNativeFeedback onPress={handleNext}>
                    <View style={tailwind("py-4 m-2 px-10 rounded-lg")}>
                        <Text style={tailwind("text-white")}>
                            {activeSlide === 2 ? "Play" : "Next"}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

export default OnboardingScreen;
