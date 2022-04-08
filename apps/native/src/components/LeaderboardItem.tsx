import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
    Image,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { config } from "../config";
import { FetchLeaderBoard } from "@crypto-koi/common/lib/graphql/queries/__generated__/FetchLeaderBoard";
import useAppState from "../hooks/useAppState";
import { useNavigation } from "../hooks/useNavigation";
import { ticker } from "@crypto-koi/common/lib/Ticker";
import { android_ripple } from "../styles/commonStyles";
import Transformer from "@crypto-koi/common/lib/Transformer";
import CircularProgress from "./CircularProgress";
import Clock from "./Clock";
import { CustomColors } from "../styles/colors";

const style = StyleSheet.create({
    img: {
        flex: 1,
        width: "100%",
    },
    imgContainer: {
        width: 60,
        height: 60,
    },
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.1)",
    },
});

type Props = FetchLeaderBoard["leaderboard"][0] & {
    index: number;
};

export const LeaderboardItem: FunctionComponent<Props> = observer((props) => {
    const tailwind = useTailwind();

    const { navigate } = useNavigation();
    const [value, setValue] = useState(moment());

    const themeStore = useAppState((rootStore) => rootStore.themeStore);

    useEffect(() => {
        ticker.addTickHandler("item-lifetime-" + props.id, () =>
            setValue(moment())
        );
        return () => ticker.removeTickHandler("item-lifetime-" + props.id);
    }, []);

    const diffSeconds = moment()
        .add(props.minutesTillDeath, "minutes")
        .diff(value, "second");
    if (diffSeconds < 0) {
        // remove the ticker
        ticker.removeTickHandler("item-lifetime-" + props.id);
    }

    return (
        <Pressable
            onPress={() =>
                navigate("CryptogotchiScreen", { cryptogotchiId: props.id })
            }
            android_ripple={android_ripple}
        >
            <Animated.View
                entering={FadeIn.delay((props.index % 20) * 100)}
                style={[
                    tailwind("px-4 flex-row py-2 items-center"),
                    style.wrapper,
                ]}
            >
                <View
                    style={tailwind(
                        "flex-row justify-between flex-1  p-1 items-center"
                    )}
                >
                    <View style={tailwind("flex-row flex-1 items-center")}>
                        <View
                            style={[
                                {
                                    backgroundColor:
                                        CustomColors.secondaryColor,
                                },
                                tailwind(
                                    "absolute -left-2 top-0 z-10 px-2 py-1  flex-row justify-center rounded-full"
                                ),
                            ]}
                        >
                            <Text
                                style={[
                                    { color: CustomColors.onSecondary },
                                    tailwind("text-xs"),
                                ]}
                            >
                                {props.index + 1}
                            </Text>
                        </View>

                        <View
                            style={[
                                tailwind("rounded-lg overflow-hidden"),
                                style.imgContainer,
                            ]}
                        >
                            <Image
                                style={style.img}
                                resizeMode="cover"
                                source={{
                                    uri: config.thumbnailUrl + "/" + props.id,
                                }}
                            />
                        </View>
                        <View style={tailwind("ml-2")}>
                            <Text
                                style={[
                                    tailwind("mb-0"),
                                    { color: CustomColors.onSecondary },
                                ]}
                            >
                                {props.name}
                            </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                style={[
                                    { color: CustomColors.onBackground },
                                    tailwind("opacity-75 w-4/5 text-xs mb-1"),
                                ]}
                            >
                                #{Transformer.uuidToUint256(props.id)}
                            </Text>
                            <View style={tailwind("flex-row flex-wrap")}>
                                <View
                                    style={tailwind(
                                        "flex-row mr-1 items-center"
                                    )}
                                >
                                    <View
                                        style={[
                                            {
                                                backgroundColor:
                                                    CustomColors.secondaryColor,
                                            },
                                            tailwind(
                                                "flex-row items-center px-2 rounded-full"
                                            ),
                                        ]}
                                    >
                                        <Icon
                                            style={[
                                                tailwind("text-lg mr-1"),
                                                {
                                                    color:
                                                        CustomColors.onSecondary,
                                                },
                                            ]}
                                            name={
                                                props.isValidNft
                                                    ? "shield"
                                                    : "shield-off"
                                            }
                                        />
                                        <Text
                                            style={[
                                                {
                                                    color:
                                                        CustomColors.onSecondary,
                                                },
                                                tailwind("text-xs"),
                                            ]}
                                        >
                                            {props.isValidNft
                                                ? "Valid NFT"
                                                : "No NFT"}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        {
                                            backgroundColor:
                                                CustomColors.secondaryColor,
                                        },
                                        tailwind(
                                            "flex-row rounded-full px-2 items-center"
                                        ),
                                    ]}
                                >
                                    <Icon
                                        style={[
                                            tailwind("text-xl mr-2"),
                                            {
                                                color: CustomColors.onSecondary,
                                            },
                                        ]}
                                        name="information-outline"
                                    />

                                    <Clock
                                        style={{
                                            color: CustomColors.onSecondary,
                                        }}
                                        id={props.id}
                                        date={props.createdAt}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={tailwind("pr-1")}>
                        <CircularProgress
                            progress={Math.max(
                                0,
                                diffSeconds / (props.maxLifetimeMinutes * 60)
                            )}
                            backgroundStrokeColor={CustomColors.onBackground}
                            radius={15}
                            svgStyle={
                                {
                                    color: CustomColors.heartColor,
                                } as StyleProp<ViewStyle>
                            }
                            strokeWidth={3}
                        >
                            <View
                                style={tailwind(
                                    "flex-row flex-1 justify-center items-center"
                                )}
                            >
                                <Icon
                                    style={[
                                        tailwind("text-lg"),
                                        {
                                            color: CustomColors.heartColor,
                                        },
                                    ]}
                                    name="heart"
                                />
                            </View>
                        </CircularProgress>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
});
