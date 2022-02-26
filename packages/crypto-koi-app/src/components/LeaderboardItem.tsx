import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { config } from "../config";
import { FetchLeaderBoard } from "../graphql/queries/__generated__/FetchLeaderBoard";
import useAppState from "../hooks/useAppState";
import { useNavigation } from "../hooks/useNavigation";
import { ticker } from "../services/Ticker";
import { android_ripple } from "../styles/commonStyles";
import Transformer from "../utils/Transformer";
import CircularProgress from "./CircularProgress";
import Clock from "./Clock";

const style = StyleSheet.create({
    img: {
        flex: 1,
        width: "100%",
    },
    imgContainer: {
        width: 50,
        height: 50,
    },
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.2)",
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
                                    backgroundColor: themeStore.secondaryColor,
                                },
                                tailwind(
                                    "absolute -left-2 top-0 z-10 px-2 py-1  flex-row justify-center rounded-full"
                                ),
                            ]}
                        >
                            <Text
                                style={[
                                    { color: themeStore.onSecondary },
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
                                    { color: themeStore.onBackground },
                                ]}
                            >
                                {props.name}
                            </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                style={[
                                    { color: themeStore.onBackground },
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
                                                    themeStore.secondaryColor,
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
                                                        themeStore.onSecondary,
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
                                                        themeStore.onSecondary,
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
                                                themeStore.secondaryColor,
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
                                                color: themeStore.onSecondary,
                                            },
                                        ]}
                                        name="information-outline"
                                    />

                                    <Clock
                                        style={{
                                            color: themeStore.onSecondary,
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
                            backgroundStrokeColor={themeStore.onBackground}
                            radius={15}
                            svgStyle={{ color: themeStore.heartColor } as any}
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
                                            color: themeStore.heartColor,
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
