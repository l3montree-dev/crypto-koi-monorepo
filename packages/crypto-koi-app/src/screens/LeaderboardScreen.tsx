import { useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import CircularProgress from "../components/CircularProgress";
import Clock from "../components/Clock";
import { Config } from "../config";
import { FETCH_LEADERBOARD } from "../graphql/queries/cryptogotchi";
import { FetchLeaderBoard } from "../graphql/queries/__generated__/FetchLeaderBoard";
import { useNavigation } from "../hooks/useNavigation";
import { rootStore } from "../mobx/RootStore";
import { ticker } from "../services/Ticker";
import { android_ripple, commonStyles } from "../styles/commonStyles";
import Transformer from "../utils/Transformer";

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
    header: {
        paddingTop: StatusBar.currentHeight ?? 0 + 5,
    },
});

type Props = FetchLeaderBoard["leaderboard"][0] & {
    index: number;
};

const LeaderboardItem: FunctionComponent<Props> = observer((props) => {
    const tailwind = useTailwind();

    const { navigate } = useNavigation();
    const [value, setValue] = useState(moment());

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
                    <View style={tailwind("flex-row items-center")}>
                        <View
                            style={[
                                {
                                    backgroundColor: rootStore.secondaryColor,
                                },
                                tailwind(
                                    "absolute -left-2 bottom-0 z-10 px-1 rounded-full"
                                ),
                            ]}
                        >
                            <Text style={{ color: rootStore.onSecondary }}>
                                {props.index + 1}.
                            </Text>
                        </View>

                        <View
                            style={[
                                tailwind("rounded-lg bg-black overflow-hidden"),
                                style.imgContainer,
                            ]}
                        >
                            <Image
                                style={style.img}
                                resizeMode="cover"
                                source={{
                                    uri: Config.thumbnailUrl + "/" + props.id,
                                }}
                            />
                        </View>
                        <View style={tailwind("ml-2")}>
                            <Text
                                style={[
                                    tailwind("mb-0"),
                                    { color: rootStore.onBackground },
                                ]}
                            >
                                {props.name}
                            </Text>
                            <Text
                                style={[
                                    { color: rootStore.onBackground },
                                    tailwind("opacity-75 text-xs mb-1"),
                                ]}
                            >
                                #{Transformer.uuidToBase64(props.id)}
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
                                                    rootStore.secondaryColor,
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
                                                        rootStore.onSecondary,
                                                },
                                            ]}
                                            name={
                                                props.id
                                                    ? "shield"
                                                    : "shield-off"
                                            }
                                        />
                                        <Text
                                            style={[
                                                {
                                                    color:
                                                        rootStore.onSecondary,
                                                },
                                                tailwind("text-xs"),
                                            ]}
                                        >
                                            {props.id ? "Valid NFT" : "No NFT"}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        {
                                            backgroundColor:
                                                rootStore.secondaryColor,
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
                                                color: rootStore.onSecondary,
                                            },
                                        ]}
                                        name="information-outline"
                                    />

                                    <Clock
                                        style={{
                                            color: rootStore.onSecondary,
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
                            backgroundStrokeColor={rootStore.onBackground}
                            radius={15}
                            svgStyle={
                                { color: rootStore.secondaryColor } as any
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
                                            color: rootStore.secondaryColor,
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

const Leaderboard = observer(() => {
    const tailwind = useTailwind();
    const { fetchMore, data } = useQuery<FetchLeaderBoard>(FETCH_LEADERBOARD, {
        variables: { offset: 0, limit: 20 },
    });

    return (
        <SafeAreaView
            style={[
                tailwind("flex-1 flex-col"),
                { backgroundColor: rootStore.backgroundColor },
            ]}
        >
            <StatusBar
                barStyle={
                    rootStore.secondaryIsDark ? "light-content" : "dark-content"
                }
            />
            <View
                style={[
                    tailwind("px-4 pb-3"),
                    style.header,
                    { backgroundColor: rootStore.secondaryColor },
                ]}
            >
                <Text
                    style={[
                        commonStyles.screenTitle,
                        tailwind("pt-1"),
                        { color: rootStore.onSecondary },
                    ]}
                >
                    Leaderboard
                </Text>
            </View>
            <FlatList
                onEndReached={() => {
                    if (data) {
                        fetchMore({
                            variables: { offset: data.leaderboard.length },
                        });
                    }
                }}
                contentContainerStyle={tailwind("pt-0")}
                renderItem={({ item, index }) => (
                    <LeaderboardItem index={index} key={item.id} {...item} />
                )}
                data={data?.leaderboard || []}
            />
        </SafeAreaView>
    );
});

export default Leaderboard;
