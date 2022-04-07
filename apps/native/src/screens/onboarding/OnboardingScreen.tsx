import { hexChainId2Number } from "@crypto-koi/common/lib/web3";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Animated as RNAnimated,
    Image,
    Linking,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View
} from "react-native";
import { Switch } from "react-native-paper";
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../../components/AppButton";
import Wave from "../../components/Wave";
import { config } from "../../config";
import { useFloating } from "../../hooks/useFloating";
import { nativeUserService } from "../../services/NativeUserService";
import { Colors, CustomColors } from "../../styles/colors";
import { DimensionUtils } from "../../utils/DimensionUtils";
import ViewUtils from "../../utils/ViewUtils";


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
        color: CustomColors.waves,
    },
    rotatedSvg: {
        transform: [{ rotate: "180deg" }],
    },
    img: {
        // maxHeight: 400,
        width: 400,
        height: 420,

        aspectRatio: 1,
        top: 0,
        // ackgroundColor: "red",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    dragon: {
        // maxHeight: 400,
        width: 440,
        height: 440,

        aspectRatio: 1,
        top: 0,
        right: 40,
        //backgroundColor: "red",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    listItem: {
        backgroundColor: "rgb(255,255,255)",
        // elevation: 1,
    },
});

function OnboardingScreen() {
    const [activeSlide, setActiveSlide] = useState(0);

    const scrollPosition = useSharedValue(0);
    const connector = useWalletConnect();

    const [agreedToTermsOfUse, setAgreedToTermsOfUse] = useState(false);
    const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);

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

    useEffect(() => {
        if (Platform.OS === "android")
            NavigationBar.setBackgroundColorAsync(Colors.cherry);
    }, []);

    const handlePlayWithWalletPress = async () => {
        if (!connector.connected) {
            await connector.connect();
        }

        const provider = new WalletConnectProvider({
            rpc: {
                [hexChainId2Number(config.chain.chainId)]: config.chain.rpcUrls[0],
            },
            chainId: hexChainId2Number(config.chain.chainId),
            connector: connector,
            qrcode: false,
        });

        await provider.enable();

        await nativeUserService.loginUsingWalletAddress(provider.accounts[0]);
    };

    const handlePlayWithoutWalletPress = () => {
        return nativeUserService.loginUsingDeviceId();
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
        if (activeSlide === 3) {
            if (agreedToTermsOfUse && agreedToPrivacyPolicy) {
                return handlePlayWithoutWalletPress();
            } else {
                return ViewUtils.toast("Please agree to the terms of use and the privacy policy");
            }
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

    return (
        <View style={[{ backgroundColor: CustomColors.bgDark }, tailwind("flex-1"),]}>
            <View style={tailwind("absolute -top-20")}>
                <Wave
                    svgStyle={[
                        style.svg,
                        style.rotatedSvg,
                    ]}
                />
            </View>
            <View style={tailwind("absolute -bottom-20")}>
                <Wave svgStyle={style.svg} />
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
                                source={require("../../../assets/image/koi.png")}
                            />
                        </RNAnimated.View>
                    </View>
                    <Text
                        style={tailwind(
                            "mt-10 text-4xl font-bold text-white text-center"
                        )}
                    >
                        Welcome
                    </Text>
                    <Text
                        style={tailwind(
                            "text-lg text-white mt-5 px-10 text-center"
                        )}
                    >
                        Grow the oldest and rarest koi inside the blockchain
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
                                    "text-4xl font-bold text-white text-center mb-5"
                                )}
                            >
                                Keep your Koi alive
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
                                    style={[tailwind("text-4xl"), { color: CustomColors.waves }]}
                                    name="food-apple"
                                />

                                <View style={tailwind("ml-5")}>
                                    <Text style={tailwind("text-sea text-lg")}>
                                        Feed your friend
                                    </Text>
                                    <Text
                                        style={tailwind("text-sea opacity-75")}
                                    >
                                        Every few hours
                                    </Text>
                                </View>
                            </Animated.View>
                            {/*<Animated.View
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
                                        style={tailwind("text-black text-lg")}
                                    >
                                        Play with him
                                    </Text>
                                    <Text
                                        style={tailwind(
                                            "text-black opacity-75"
                                        )}
                                    >
                                        And rank against your friends
                                    </Text>
                                </View>
                                        </Animated.View>*/}
                            <Animated.View
                                style={[
                                    style.listItem,
                                    tailwind(
                                        "flex-row mx-0 my-2 px-4 py-3 rounded-lg items-center"
                                    ),
                                ]}
                                entering={FadeIn.delay(1000)}
                            >
                                <Icon
                                    style={[tailwind("text-4xl"), { color: CustomColors.waves }]}
                                    name="heart"
                                />
                                <View style={tailwind("ml-5")}>
                                    <Text style={tailwind("text-sea text-lg")}>
                                        Build a relationship
                                    </Text>
                                    <Text
                                        style={tailwind("text-sea opacity-75")}
                                    >
                                        And show your koi to your friends
                                    </Text>
                                </View>
                            </Animated.View>
                        </>
                    )}
                </View>
                <View
                    style={[
                        style.slide,
                        tailwind("flex-1 px-4 justify-center"),
                    ]}
                >
                    {activeSlide === 2 && (<>
                        <View>
                            <RNAnimated.View style={{ translateX, translateY }}>
                                <Image
                                    style={style.dragon}
                                    resizeMode="contain"
                                    source={require("../../../assets/image/dragon.png")}
                                />
                            </RNAnimated.View>
                        </View>
                        <Text
                            style={tailwind(
                                "mt-10 text-4xl font-bold text-white text-center"
                            )}
                        >
                            Proof your determination
                        </Text>
                        <Text
                            style={tailwind(
                                "text-lg text-white mt-5 px-10 text-center"
                            )}
                        >
                            Let your Koi evolve into a dragon
                        </Text>
                    </>)}
                </View>
                <View
                    style={[
                        style.slide,
                        tailwind(
                            "flex-col flex-1 justify-center px-4 items-center"
                        ),
                    ]}
                >
                    {activeSlide === 3 && (
                        <Animated.View entering={FadeIn}>
                            <Text
                                style={tailwind(
                                    "text-white text-4xl font-bold text-center mb-5"
                                )}
                            >
                                Make it an NFT
                            </Text>
                            <Text
                                style={tailwind("text-white text-lg text-center")}
                            >
                                To never loose your friend again you can make
                                him unique by putting him in an NFT
                            </Text>
                            <View style={tailwind("bg-white rounded-lg mt-4")}>
                                <View style={tailwind("flex p-4 border-b-2 border-soft flex-row items-center")}>
                                    <Switch
                                        value={agreedToTermsOfUse}
                                        color={Colors.cherry}
                                        onChange={() =>
                                            setAgreedToTermsOfUse(
                                                (prev) => !prev
                                            )
                                        }
                                    />
                                    <Text style={tailwind("pl-2 flex-1")}>I hereby agree to the terms of use <Text onPress={() => Linking.openURL(config.termsOfServiceLink)} style={tailwind("text-cherry")}>( Read )</Text></Text>
                                </View>
                                <View style={tailwind("flex p-4 flex-row items-center mb-2")}>
                                    <Switch
                                        value={agreedToPrivacyPolicy}
                                        color={Colors.cherry}
                                        onChange={() =>
                                            setAgreedToPrivacyPolicy(
                                                (prev) => !prev
                                            )
                                        }
                                    />
                                    <Text style={tailwind("pl-2 flex-1")}>I hereby agree to the privacy policy <Text onPress={() => Linking.openURL(config.privacyPolicyLink)} style={tailwind("text-cherry")}>( Read )</Text></Text>
                                </View>
                            </View>
                            <View style={tailwind("mt-5")}>
                                <AppButton
                                    backgroundColor={Colors.cherry}
                                    textColor="white"
                                    disabled={!agreedToTermsOfUse || !agreedToPrivacyPolicy}
                                    onPress={handlePlayWithWalletPress}
                                    title="I already have a Wallet"
                                />
                            </View>
                            <View style={tailwind("mt-4")}>
                                <AppButton
                                    backgroundColor={
                                        CustomColors.onBgDark
                                    }
                                    disabled={!agreedToTermsOfUse || !agreedToPrivacyPolicy}
                                    textColor="white"
                                    onPress={handlePlayWithoutWalletPress}
                                    title="Play without connected Wallet"
                                />
                            </View>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>
            <View style={tailwind("flex-row items-center justify-between")}>
                <TouchableNativeFeedback onPress={handleBack}>
                    <View style={tailwind("px-10 rounded-lg m-2 py-4")}>
                        <Text style={[tailwind("text-white"), opacity]}>
                            Back
                        </Text>
                    </View>
                </TouchableNativeFeedback>

                <View style={tailwind("flex-row")}>
                    {[0, 1, 2, 3].map((_, index) => (
                        <View
                            key={index}
                            style={[
                                tailwind("bg-cherry-300 mx-2 rounded"),
                                style.dot,
                            ]}
                        />
                    ))}
                    <Animated.View
                        style={[
                            style.dot,
                            tailwind("bg-cherry-100 rounded absolute mx-2"),
                            animatedActiveDotStyle,
                        ]}
                    />
                </View>
                <TouchableNativeFeedback onPress={handleNext}>
                    <View style={tailwind("py-4 m-2 px-10 rounded-lg")}>
                        <Text style={tailwind("text-white")}>
                            {activeSlide === 3 ? "Play" : "Next"}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

export default OnboardingScreen;
