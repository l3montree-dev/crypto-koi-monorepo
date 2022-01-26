import { useMutation } from "@apollo/client";
import { BlurView } from "expo-blur";
import { observer } from "mobx-react-lite";
import React from "react";
import {
    Animated,
    Animated as RNAnimated,
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import CircularProgress from "./components/CircularProgress";
import FriendInfo from "./components/FriendInfo";
import FriendTitle from "./components/FriendTitle";
import IconButton from "./components/IconButton";
import NextFeedButton from "./components/NextFeedButton";
import SimpleClock from "./components/SimpleClock";
import { FEED_CRYPTOGOTCHI_MUTATION } from "./graphql/queries/cryptogotchiMutations";
import { Feed, FeedVariables } from "./graphql/queries/__generated__/Feed";
import useAppState from "./hooks/useAppState";
import { useFloating } from "./hooks/useFloating";
import { useNavigation } from "./hooks/useNavigation";
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
    ticker: {
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight,
            },
        }),
    },
});

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const FriendsScreen = observer(() => {
    const tailwind = useTailwind();
    const { translateX, translateY } = useFloating();
    const cryptogotchi = useAppState(selectFirstCryptogotchi);
    const { navigate } = useNavigation();
    const [feed, { loading }] = useMutation<Feed, FeedVariables>(
        FEED_CRYPTOGOTCHI_MUTATION
    );
    const handleFeed = async () => {
        if (!cryptogotchi) {
            return;
        }
        try {
            const res = await feed({ variables: { id: cryptogotchi.id } });
            if (!res.data) {
                return;
            }
            cryptogotchi.setFromFragment(res.data.feed);
        } catch (e) {
            //
        }
    };

    return (
        <SafeAreaView style={tailwind("flex-1 flex-col")}>
            <ScrollView stickyHeaderIndices={[0]}>
                {cryptogotchi && (
                    <BlurView intensity={0} style={tailwind("rounded-lg")}>
                        <View
                            style={[
                                style.ticker,
                                tailwind("flex-row justify-center py-2 px-4"),
                            ]}
                        >
                            <View>
                                <Pressable onPress={handleFeed}>
                                    <View
                                        style={tailwind(
                                            "flex-col items-center justify-center"
                                        )}
                                    >
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
                                            svgStyle={tailwind(
                                                "text-amber-500"
                                            )}
                                            strokeWidth={6}
                                        >
                                            <View
                                                style={tailwind(
                                                    "flex-row flex-1 justify-center items-center"
                                                )}
                                            >
                                                <Icon
                                                    style={tailwind(
                                                        "text-amber-500 text-2xl"
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
                                </Pressable>
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

                <View
                    style={tailwind(
                        "flex-row text-amber-500 absolute bottom-0 w-full h-44 justify-center"
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
                <View style={tailwind("flex-1 mt-10")}>
                    <RNAnimated.View
                        style={[{ translateX, translateY }, style.z1]}
                    >
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
                            "flex-row absolute left-0 right-0 justify-center top-0"
                        ),
                        style.z1,
                    ]}
                ></View>
                <View style={tailwind("flex-col mx-4 justify-end")}>
                    <View style={tailwind("flex-row justify-between")}>
                        {cryptogotchi && (
                            <FriendTitle cryptogotchi={cryptogotchi} />
                        )}
                        <View style={tailwind("rounded-lg overflow-hidden")}>
                            <IconButton
                                disabled={!cryptogotchi}
                                onPress={() => {
                                    if (!cryptogotchi) {
                                        return;
                                    }
                                    navigate("FriendEditScreen", {
                                        cryptogotchiId: cryptogotchi.id,
                                        name: cryptogotchi.name || "",
                                        isAlive: cryptogotchi.isAlive,
                                    });
                                }}
                                name="dots-horizontal"
                            />
                        </View>
                    </View>

                    {cryptogotchi && <FriendInfo cryptogotchi={cryptogotchi} />}
                </View>
            </ScrollView>
            {cryptogotchi && (
                <View style={tailwind("bg-violet-900 pt-4 px-4 pb-2")}>
                    <NextFeedButton
                        disabled={!cryptogotchi.isAlive}
                        loading={loading}
                        onPress={handleFeed}
                        cryptogotchi={cryptogotchi}
                    />
                </View>
            )}
        </SafeAreaView>
    );
});

export default FriendsScreen;
