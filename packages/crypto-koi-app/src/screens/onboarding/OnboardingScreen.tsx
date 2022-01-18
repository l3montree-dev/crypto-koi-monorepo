import React, { useMemo, useRef, useState } from "react";
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
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { mixPath, parse } from "react-native-redash";
import { Path } from "react-native-svg";
import { useTailwind } from "tailwind-rn";
import Wave from "../../components/Wave";
import { useFloating } from "../../hooks/useFloating";
import { DimensionUtils } from "../../utils/DimensionUtils";

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
});

const blob1 = parse(
    "M42.6,24C31.2,44.5,-18.8,42.1,-32.4,20.5C-45.9,-1.2,-23,-42.2,2.1,-41C27.1,-39.8,54.1,3.5,42.6,24Z"
);

const blob2 = parse(
    "M44.4,29.3C32.4,46.4,-19.7,43.9,-33.8,25.6C-47.9,7.4,-23.9,-26.7,2.1,-25.5C28.2,-24.2,56.3,12.3,44.4,29.3Z"
);

const blob3 = parse(
    "M13.9,10.4C2.4,27.9,-33.3,33.9,-39.6,19.3C-46,4.6,-23,-30.5,-5.1,-33.5C12.7,-36.5,25.4,-7.2,13.9,10.4Z"
);

const AnimatedPath = Animated.createAnimatedComponent(Path);
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

    const animatedProps = useAnimatedProps(() => {
        "worklet";
        // check which is the active screen.
        const v = scrollPosition.value / DimensionUtils.deviceWidth;
        let d: string;
        if (v < 1) {
            d = mixPath(v, blob1, blob2);
        } else {
            d = mixPath(v - 1, blob2, blob3);
        }
        return {
            d,
        };
    });

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
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: (activeSlide + 1) * DimensionUtils.deviceWidth,
                y: 0,
                animated: true,
            });
        }
    };

    const floatingStyle = useFloating();

    const opacity = useMemo(() => ({ opacity: activeSlide > 0 ? 1 : 0.5 }), [
        activeSlide,
    ]);
    return (
        <View style={tailwind("flex flex-1 bg-purple-700")}>
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
                style={tailwind("flex-1")}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >
                <View style={[style.slide, tailwind("mt-20 flex-1")]}>
                    <View>
                        <RNAnimated.View style={floatingStyle}>
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
                <View style={style.slide}>
                    <Text>Hi</Text>
                </View>
                <View style={style.slide}>
                    <Text>Test</Text>
                </View>
            </ScrollView>

            <View style={tailwind("absolute bottom-0")}>
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
                    {[0, 1, 2].map((slide, index) => (
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
                        <Text style={tailwind("text-white")}>Next</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

export default OnboardingScreen;
