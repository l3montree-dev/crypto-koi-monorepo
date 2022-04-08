import { useMutation } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import {
    Animated as RNAnimated,
    Image,
    Linking,
    Platform,
    Pressable,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import FriendInfo from "../components/FriendInfo";
import FriendTitle from "../components/FriendTitle";
import IconButton from "../components/IconButton";
import Lifetime from "../components/Lifetime";
import NextFeedButton from "../components/NextFeedButton";
import { config } from "../config";
import * as NavigationBar from "expo-navigation-bar";
import { FEED_CRYPTOGOTCHI_MUTATION } from "@crypto-koi/common/lib/graphql/queries/cryptogotchi";
import {
    Feed,
    FeedVariables,
} from "@crypto-koi/common/lib/graphql/queries/__generated__/Feed";
import useAppState from "../hooks/useAppState";
import { useFloating } from "../hooks/useFloating";
import { useNavigation } from "../hooks/useNavigation";
import Cryptogotchi from "@crypto-koi/common/lib/mobx/Cryptogotchi";
import {
    selectCryptogotchies,
    selectCurrentUser,
    selectThemeStore,
} from "@crypto-koi/common/lib/mobx/selectors";
import ThemeStore from "@crypto-koi/common/lib/mobx/ThemeStore";
import { DimensionUtils } from "../utils/DimensionUtils";
import ViewUtils from "../utils/ViewUtils";
import { CustomColors } from "../styles/colors";
import GradientBackground from "../components/GradientBackground";

const style = StyleSheet.create({
    img: {
        width: 400,
        height: 400,
    },
    instagramHandle: {
        zIndex: 1,
        // backgroundColor: "black",
        transform: [{ rotate: "-90deg" }, { translateY: 62 }],
    },
    z1: {
        zIndex: 1,
    },
    dead: {
        tintColor: "black",
        opacity: 0.6,
    },
    bg: {},
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

type RefreshingProps = {
    refreshing?: boolean;
    onRefresh?: () => void;
};

type ViewProps = {
    cryptogotchi: Cryptogotchi;
    clockIdPrefix: string;
    // necessary for the horizontal scroll view in friend screen.
    isVisible: boolean;
};
type Props = ViewProps | (ViewProps & RefreshingProps);

const AnimatedEllipse = RNAnimated.createAnimatedComponent(Ellipse);

const CryptogotchiView = observer((props: Props) => {
    let { cryptogotchi } = props;

    const tailwind = useTailwind();
    const { translateX, translateY } = useFloating();
    const currentUser = useAppState(selectCurrentUser);
    const cryptogotchies = useAppState(selectCryptogotchies);
    const currentUserIsOwner = currentUser?.id === cryptogotchi.id;

    if (currentUserIsOwner && cryptogotchies) {
        // if the user is the owner of the cryptogotchi we need to set the rendered cryptogotchi to his own.
        // this makes sure to not render the cryptogotchi of the user and to update every values on the FriendScreen
        cryptogotchi =
            cryptogotchies.find((cr) => cr.id === cryptogotchi.id) ??
            // add fallback if something else did went wrong
            cryptogotchi;
    }

    const [feed, { loading }] = useMutation<Feed, FeedVariables>(
        FEED_CRYPTOGOTCHI_MUTATION
    );

    const themeStore = useAppState(selectThemeStore);

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
                // paddingBottom: 20,
            },
            wave: {
                bottom: currentUserIsOwner ? 25 : 82,
                height: 330,
            },
        }),
        [currentUserIsOwner]
    );

    const copyTokenId = () => {
        Clipboard.setString(cryptogotchi.getUint256);
        ViewUtils.toast("Copied");
    };

    useFocusEffect(() => {
        if (props.isVisible) {
            themeStore.setColor(cryptogotchi.color);
            if (Platform.OS === "android")
                NavigationBar.setBackgroundColorAsync(
                    themeStore.secondaryColor
                );
        }
    });

    return (
        <SafeAreaView style={tailwind("flex-1 flex-col")}>
            <StatusBar barStyle={"light-content"} />
            <View style={tailwind("absolute")}>
                <GradientBackground inSafeAreaView={true} />
            </View>

            <ScrollView
                refreshControl={
                    "onRefresh" in props ? (
                        <RefreshControl
                            onRefresh={props.onRefresh}
                            refreshing={!!props.refreshing}
                        />
                    ) : undefined
                }
                //style={tailwind("bg-slate-900")}
                contentContainerStyle={memoStyle.contentContainerStyle}
                stickyHeaderIndices={[0]}
            >
                {cryptogotchi && (
                    <>
                        <View
                            style={[
                                style.ticker,
                                tailwind("flex-row justify-center py-2 px-4"),
                            ]}
                        >
                            <View>
                                <Pressable onPress={handleFeed}>
                                    <Lifetime
                                        heartColor={CustomColors.heartColor}
                                        onBackgroundColor={
                                            CustomColors.onBackground
                                        }
                                        clockId={
                                            props.clockIdPrefix +
                                            cryptogotchi.id +
                                            "-lifetime"
                                        }
                                        cryptogotchi={cryptogotchi}
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View
                            style={tailwind(
                                "absolute z-50 items-end flex-col right-4 top-1/3"
                            )}
                        >
                            <View
                                style={[
                                    tailwind(
                                        "mb-2 flex-1 px-2 py-2 flex items-center rounded-lg w-24"
                                    ),
                                    {
                                        backgroundColor:
                                            CustomColors.heartColor,
                                    },
                                ]}
                            >
                                <View
                                    style={tailwind(
                                        "flex-row items-center w-full"
                                    )}
                                >
                                    <Icon
                                        style={{
                                            color: CustomColors.onSecondary,
                                        }}
                                        name="trophy"
                                        size={14}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="middle"
                                        style={[
                                            { color: CustomColors.onSecondary },
                                            tailwind("ml-1 text-xs"),
                                        ]}
                                    >
                                        {cryptogotchi.isAlive
                                            ? cryptogotchi.rank > 0
                                                ? cryptogotchi.rank
                                                : "Pending"
                                            : "Dead"}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    tailwind(
                                        "pr-2 mb-5 flex-1 flex items-center rounded-lg w-24"
                                    ),
                                    {
                                        backgroundColor:
                                            CustomColors.heartColor,
                                    },
                                ]}
                            >
                                <Pressable
                                    style={tailwind("flex-1 px-3 py-2")}
                                    onPress={copyTokenId}
                                >
                                    <View
                                        style={tailwind(
                                            "flex-row items-center"
                                        )}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="middle"
                                            style={{
                                                color: CustomColors.onSecondary,
                                            }}
                                        >
                                            #{cryptogotchi.getUint256}
                                        </Text>
                                        <Icon
                                            style={{
                                                color: CustomColors.onSecondary,
                                            }}
                                            name="content-copy"
                                        />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </>
                )}

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
                                uri: config.imageUrl + "/" + cryptogotchi.id,
                            }}
                        />
                    </RNAnimated.View>

                    <View
                        style={[
                            style.instagramHandle,
                            tailwind("right-0 flex-row bottom-40 absolute"),
                        ]}
                    >
                        <Text style={{ color: CustomColors.onBackground }}>
                            Artwork by:{" "}
                        </Text>

                        <Pressable
                            onPress={() => {
                                Linking.openURL(
                                    "https://www.instagram.com/tamxily.tattoo/"
                                );
                            }}
                        >
                            <Text style={{ color: CustomColors.onBackground }}>
                                &#64;tamxily.tattoo
                            </Text>
                        </Pressable>
                    </View>

                    {/*<View style={tailwind("flex-row relative justify-center")}>
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
                                fill="rgba(0,0,0,0.8)"
                            />
                        </Svg>
                                </View>*/}
                </View>

                <View style={tailwind("flex-col px-4 justify-end pt-4")}>
                    <View style={tailwind("flex-row mb-4 justify-between")}>
                        {cryptogotchi && (
                            <FriendTitle
                                textColor={CustomColors.onSecondary}
                                cryptogotchi={cryptogotchi}
                            />
                        )}
                        {currentUserIsOwner && (
                            <View
                                style={tailwind("rounded-lg overflow-hidden")}
                            >
                                <IconButton
                                    color={CustomColors.onSecondary}
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
                            textColor={CustomColors.onSecondary}
                            clockId={
                                props.clockIdPrefix +
                                cryptogotchi.id +
                                "-friend-info"
                            }
                            cryptogotchi={cryptogotchi}
                        />
                    )}
                </View>
            </ScrollView>

            {currentUserIsOwner && (
                <View
                    style={[
                        tailwind("pt-4 px-4 pb-8"),
                        { backgroundColor: CustomColors.onSecondary },
                    ]}
                >
                    <NextFeedButton
                        buttonBackgroundColor={
                            CustomColors.buttonBackgroundColor
                        }
                        buttonTextColor={CustomColors.buttonTextColor}
                        buttonProgressUnfilled={
                            CustomColors.buttonProgressUnfilled
                        }
                        buttonProgressFilled={CustomColors.buttonProgressFilled}
                        disabled={!cryptogotchi.isAlive}
                        loading={loading}
                        clockId={
                            props.clockIdPrefix +
                            cryptogotchi.id +
                            "-next-feed-button"
                        }
                        onPress={handleFeed}
                        cryptogotchi={cryptogotchi}
                    />
                </View>
            )}
        </SafeAreaView>
    );
});

export default CryptogotchiView;
