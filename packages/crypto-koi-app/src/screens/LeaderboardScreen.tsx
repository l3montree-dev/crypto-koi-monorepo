import { useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { LeaderboardItem } from "../components/LeaderboardItem";
import { FETCH_LEADERBOARD } from "../graphql/queries/cryptogotchi";
import { FetchLeaderBoard } from "../graphql/queries/__generated__/FetchLeaderBoard";
import useAppState from "../hooks/useAppState";
import { commonStyles } from "../styles/commonStyles";

const style = StyleSheet.create({
    header: {
        paddingTop: StatusBar.currentHeight ?? 0 + 5,
    },
});

const Leaderboard = observer(() => {
    const tailwind = useTailwind();
    const { fetchMore, data } = useQuery<FetchLeaderBoard>(FETCH_LEADERBOARD, {
        variables: { offset: 0, limit: 20 },
        pollInterval: 10 * 1000,
    });

    const themeStore = useAppState((rootStore) => rootStore.themeStore);

    return (
        <SafeAreaView
            style={[
                tailwind("flex-1 flex-col"),
                { backgroundColor: themeStore.backgroundColor },
            ]}
        >
            <StatusBar
                barStyle={
                    themeStore.secondaryIsDark
                        ? "light-content"
                        : "dark-content"
                }
            />
            <View
                style={[
                    tailwind("px-4 pb-3"),
                    style.header,
                    { backgroundColor: themeStore.secondaryColor },
                ]}
            >
                <View style={tailwind("mt-3")}>
                    <Text
                        style={[
                            commonStyles.screenTitle,
                            tailwind("pt-1"),
                            { color: themeStore.onSecondary },
                        ]}
                    >
                        Leaderboard
                    </Text>
                </View>
            </View>
            <FlatList
                onEndReachedThreshold={0.5}
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
