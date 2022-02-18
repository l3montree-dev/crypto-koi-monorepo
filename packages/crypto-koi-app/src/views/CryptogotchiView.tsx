import { useMutation } from "@apollo/client";
import { BlurView } from "expo-blur";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo } from "react";
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
import * as NavigationBar from "expo-navigation-bar";
import Svg, { Ellipse } from "react-native-svg";
import { useTailwind } from "tailwind-rn/dist";
import FriendInfo from "../components/FriendInfo";
import FriendTitle from "../components/FriendTitle";
import IconButton from "../components/IconButton";
import Lifetime from "../components/Lifetime";
import NextFeedButton from "../components/NextFeedButton";
import { Config } from "../config";
import { FEED_CRYPTOGOTCHI_MUTATION } from "../graphql/queries/cryptogotchi";
import { Feed, FeedVariables } from "../graphql/queries/__generated__/Feed";
import useAppState from "../hooks/useAppState";
import { useFloating } from "../hooks/useFloating";
import { useNavigation } from "../hooks/useNavigation";
import Cryptogotchi from "../mobx/Cryptogotchi";
import RootStore, { rootStore } from "../mobx/RootStore";
import { selectCurrentUser, selectFirstCryptogotchi } from "../mobx/selectors";
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
        // tintColor: "black",
        // opacity: 0.6,
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
    clockIdPrefix: string;
};

const AnimatedEllipse = RNAnimated.createAnimatedComponent(Ellipse);

const CryptogotchiView = observer((props: Props) => {
    let { cryptogotchi } = props;
    const tailwind = useTailwind();
    const { translateX, translateY } = useFloating();
    const currentUser = useAppState(selectCurrentUser);
    const cryptogotchiOfUser = useAppState(selectFirstCryptogotchi);
    const currentUserIsOwner = currentUser?.id === cryptogotchi.ownerId;
    if (currentUserIsOwner && cryptogotchiOfUser) {
        // if the user is the owner of the cryptogotchi we need to set the rendered cryptogotchi to his own.
        // this makes sure to not render the cryptogotchi of the user and to update every values on the FriendScreen
        cryptogotchi = cryptogotchiOfUser;
    }

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

    const {
        primaryColor,
        backgroundColor,
        secondaryColor,
        onBackground,
        onSecondary,
        buttonBackgroundColor,
        buttonTextColor,
        buttonProgressUnfilled,
        buttonProgressFilled,
        backgroundIsDark,
    } = useMemo(() => {
        return RootStore.calculateColorVariants(cryptogotchi.color);
    }, [cryptogotchi.color]);

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(secondaryColor);
        rootStore.setCurrentHeaderTintColor(onSecondary);
        return () => {
            // reset to the users secondary color
            NavigationBar.setBackgroundColorAsync(rootStore.secondaryColor);
        };
    }, [secondaryColor, onSecondary]);

    return (
        <SafeAreaView
            style={[tailwind("flex-1 flex-col"), { backgroundColor }]}
        >
            <StatusBar
                barStyle={backgroundIsDark ? "light-content" : "dark-content"}
            />
            {/*<Image
                // style={tailwind("flex-1")}
                resizeMode="cover"
                style={style.bgImg}
                source={require("../../assets/image/stars_back.png")}
            />*/}
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
                                    <Lifetime
                                        heartColor={primaryColor}
                                        onBackgroundColor={onBackground}
                                        clockId={
                                            props.clockIdPrefix + "-lifetime"
                                        }
                                        cryptogotchi={cryptogotchi}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </BlurView>
                )}

                <View
                    style={[
                        tailwind(
                            "flex-row absolute w-full h-44 justify-center"
                        ),
                        memoStyle.wave,
                    ]}
                >
                    <Svg
                        style={{ color: secondaryColor } as any}
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
                                !cryptogotchi.isAlive && style.dead,
                            ]}
                            resizeMode="contain"
                            source={{
                                uri:
                                    Config.imageUrl +
                                    "/" +
                                    cryptogotchi.id +
                                    "?" +
                                    Date.now(),
                            }}
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
                            <FriendTitle
                                textColor={onSecondary}
                                cryptogotchi={cryptogotchi}
                            />
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
                            textColor={onSecondary}
                            clockId={props.clockIdPrefix + "-friend-info"}
                            cryptogotchi={cryptogotchi}
                        />
                    )}
                </View>
            </ScrollView>

            {currentUserIsOwner && (
                <View
                    style={[
                        tailwind("pt-4 px-4 pb-2"),
                        { backgroundColor: secondaryColor },
                    ]}
                >
                    <NextFeedButton
                        buttonBackgroundColor={buttonBackgroundColor}
                        buttonTextColor={buttonTextColor}
                        buttonProgressUnfilled={buttonProgressUnfilled}
                        buttonProgressFilled={buttonProgressFilled}
                        disabled={!cryptogotchi.isAlive}
                        loading={loading}
                        clockId={props.clockIdPrefix + "-next-feed-button"}
                        onPress={handleFeed}
                        cryptogotchi={cryptogotchi}
                    />
                </View>
            )}
        </SafeAreaView>
    );
});

export default CryptogotchiView;
