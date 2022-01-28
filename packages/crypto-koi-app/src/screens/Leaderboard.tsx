import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import CircularProgress from "../components/CircularProgress";
import Clock from "../components/Clock";
import { FETCH_LEADERBOARD } from "../graphql/queries/cryptogotchi";
import { FetchLeaderBoard } from "../graphql/queries/__generated__/FetchLeaderBoard";
import { useNavigation } from "../hooks/useNavigation";
import { ticker } from "../services/Ticker";
import { android_ripple } from "../styles/commonStyles";
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
        borderBottomColor: "rgba(255,255,255,0.2)",
    },
});

type Props = FetchLeaderBoard["leaderboard"][0] & {
    index: number;
};

const LeaderboardItem: FunctionComponent<Props> = (props) => {
    const tailwind = useTailwind();

    const { navigate } = useNavigation();
    const [value, setValue] = useState(moment());

    useEffect(() => {
        ticker.addTickHandler("lifetime-" + props.id, () => setValue(moment()));
        return () => ticker.removeTickHandler("lifetime");
    }, []);

    const diffSeconds = moment(props.snapshotValid)
        .add(props.minutesTillDeath, "minutes")
        .diff(value, "second");
    if (diffSeconds < 0) {
        // remove the ticker
        ticker.removeTickHandler("lifetime-" + props.id);
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
                            style={tailwind(
                                "absolute -left-2 bg-slate-800 bottom-0 z-10 px-1 rounded-full"
                            )}
                        >
                            <Text style={tailwind("text-white opacity-75")}>
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
                                source={require("../../assets/image/cg-3.png")}
                            />
                        </View>
                        <View style={tailwind("ml-2")}>
                            <Text style={tailwind("text-white mb-0")}>
                                {props.name}
                            </Text>
                            <Text
                                style={tailwind(
                                    "opacity-75 text-slate-500 mb-1"
                                )}
                            >
                                #
                                {props.tokenId ??
                                    Transformer.uuidToBase64(props.id)}
                            </Text>
                            <View style={tailwind("flex-row flex-wrap")}>
                                <View
                                    style={tailwind(
                                        "flex-row mr-1 items-center"
                                    )}
                                >
                                    <View
                                        style={tailwind(
                                            "bg-slate-800 flex-row items-center px-2 rounded-full"
                                        )}
                                    >
                                        <Icon
                                            style={[
                                                tailwind("text-lg mr-1"),
                                                props.tokenId
                                                    ? tailwind("text-amber-500")
                                                    : tailwind(
                                                          "text-white opacity-75"
                                                      ),
                                            ]}
                                            name={
                                                props.tokenId
                                                    ? "shield"
                                                    : "shield-off"
                                            }
                                        />
                                        <Text
                                            style={tailwind(
                                                "text-xs text-white opacity-75"
                                            )}
                                        >
                                            {props.tokenId
                                                ? "Valid NFT"
                                                : "No NFT"}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={tailwind(
                                        "flex-row bg-slate-800 rounded-full px-2 items-center"
                                    )}
                                >
                                    <Icon
                                        style={tailwind(
                                            "text-xl mr-2 text-amber-500"
                                        )}
                                        name="information-outline"
                                    />

                                    <Clock
                                        style={tailwind(
                                            "text-white opacity-75"
                                        )}
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
                            backgroundStrokeColor={"rgba(255,255,255,0.2)"}
                            radius={15}
                            svgStyle={tailwind("text-amber-500")}
                            strokeWidth={2}
                        >
                            <View
                                style={tailwind(
                                    "flex-row flex-1 justify-center items-center"
                                )}
                            >
                                <Icon
                                    style={tailwind("text-amber-500 text-lg")}
                                    name="heart"
                                />
                            </View>
                        </CircularProgress>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
};

function Leaderboard() {
    const tailwind = useTailwind();
    const { fetchMore, data } = useQuery<FetchLeaderBoard>(FETCH_LEADERBOARD, {
        variables: { offset: 0, limit: 20 },
    });

    return (
        <SafeAreaView style={tailwind("flex-1 bg-slate-900 flex-col")}>
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
}

export default Leaderboard;
