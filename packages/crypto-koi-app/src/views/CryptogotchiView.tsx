import { useMutation } from "@apollo/client";
import { BlurView } from "expo-blur";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import {
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
import { useTailwind } from "tailwind-rn/dist";
import FriendInfo from "../components/FriendInfo";
import FriendTitle from "../components/FriendTitle";
import IconButton from "../components/IconButton";
import Lifetime from "../components/Lifetime";
import NextFeedButton from "../components/NextFeedButton";
import { FEED_CRYPTOGOTCHI_MUTATION } from "../graphql/queries/cryptogotchi";
import { Feed, FeedVariables } from "../graphql/queries/__generated__/Feed";
import useAppState from "../hooks/useAppState";
import { useFloating } from "../hooks/useFloating";
import { useNavigation } from "../hooks/useNavigation";
import Cryptogotchi from "../mobx/Cryptogotchi";
import { selectCurrentUser } from "../mobx/selectors";
import { DimensionUtils } from "../utils/DimensionUtils";

const style = StyleSheet.create({
    img: {
        width: 400,
        height: 400,
    },
    z1: {
        zIndex: 1,
    },
    dead: {
        tintColor: "gray",
        opacity: 0.8,
    },
    ticker: {
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight,
            },
        }),
    },
    bgImg: {
        top: 0,
        left: 0,
        // backgroundColor: "red",
        width: DimensionUtils.deviceWidth,
        height: DimensionUtils.deviceHeight,
        position: "absolute",
    },
});

type Props = {
    cryptogotchi: Cryptogotchi;
};

const AnimatedEllipse = RNAnimated.createAnimatedComponent(Ellipse);

const CryptogotchiView = observer((props: Props) => {
    const { cryptogotchi } = props;
    const tailwind = useTailwind();
    const { translateX, translateY } = useFloating();
    const currentUser = useAppState(selectCurrentUser);

    const currentUserIsOwner = currentUser?.id === cryptogotchi.ownerId;

    const [feed, { loading }] = useMutation<Feed, FeedVariables>(
        FEED_CRYPTOGOTCHI_MUTATION
    );

    const { navigate } = useNavigation();
    const handleFeed = async () => {
        if (!currentUserIsOwner) {
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

    const memoStyle = useMemo(
        () => ({
            contentContainerStyle: {
                minHeight:
                    DimensionUtils.deviceHeight -
                    (currentUserIsOwner ? 36 : -39),
                paddingBottom: 20,
            },
            wave: {
                bottom: currentUserIsOwner ? 25 : 82,
            },
        }),
        [currentUserIsOwner]
    );

    return (
        <SafeAreaView style={tailwind("flex-1 bg-black flex-col")}>
            <Image
                // style={tailwind("flex-1")}
                resizeMode="cover"
                style={style.bgImg}
                source={require("../../assets/image/stars_back.png")}
            />
            <ScrollView
                //style={tailwind("bg-slate-900")}
                contentContainerStyle={memoStyle.contentContainerStyle}
                stickyHeaderIndices={[0]}
            >
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
                                    <Lifetime cryptogotchi={cryptogotchi} />
                                </Pressable>
                            </View>
                        </View>
                    </BlurView>
                )}

                <View
                    style={[
                        tailwind(
                            "flex-row text-amber-500 absolute w-full h-44 justify-center"
                        ),
                        memoStyle.wave,
                    ]}
                >
                    <Svg
                        style={tailwind("text-slate-900")}
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
                            source={require("../../assets/image/cg-3.png")}
                        />
                    </RNAnimated.View>
                    <View style={tailwind("flex-row relative justify-center")}>
                        <Svg width={150} height={75}>
                            <AnimatedEllipse
                                rx={RNAnimated.diffClamp(
                                    RNAnimated.multiply(translateY, -1),
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

                <View style={tailwind("flex-col mx-4 justify-end")}>
                    <View style={tailwind("flex-row justify-between")}>
                        {cryptogotchi && (
                            <FriendTitle cryptogotchi={cryptogotchi} />
                        )}
                        {currentUserIsOwner && (
                            <View
                                style={tailwind("rounded-lg overflow-hidden")}
                            >
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
                        )}
                    </View>

                    {cryptogotchi && (
                        <FriendInfo
                            clockId="friend"
                            cryptogotchi={cryptogotchi}
                        />
                    )}
                </View>
            </ScrollView>

            {currentUserIsOwner && (
                <View style={tailwind("bg-slate-900 pt-4 px-4 pb-2")}>
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

export default CryptogotchiView;
