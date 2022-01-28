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
                entering={FadeIn.delay(props.index * 100)}
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
                        <Text style={tailwind("text-white mr-3")}>
                            {props.index + 1}.
                        </Text>
                        <View
                            style={[
                                tailwind(
                                    "rounded-lg bg-slate-400 overflow-hidden"
                                ),
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
                            <Text style={tailwind("text-white")}>
                                {props.name}
                            </Text>
                            <Clock
                                style={tailwind("text-white opacity-75")}
                                id={props.id}
                                date={props.createdAt}
                            />
                        </View>
                    </View>
                    <View style={tailwind("pr-1")}>
                        <CircularProgress
                            progress={Math.max(
                                0,
                                diffSeconds / (props.maxLifetimeMinutes * 60)
                            )}
                            backgroundStrokeColor={"rgba(255,255,255,0.2)"}
                            radius={20}
                            svgStyle={tailwind("text-amber-500")}
                            strokeWidth={3}
                        >
                            <View
                                style={tailwind(
                                    "flex-row flex-1 justify-center items-center"
                                )}
                            >
                                <Icon
                                    style={tailwind("text-amber-500 text-2xl")}
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
