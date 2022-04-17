import { useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import React from "react";
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { LeaderboardItem } from "../components/LeaderboardItem";
import { FETCH_LEADERBOARD } from "@crypto-koi/common/lib/graphql/queries/cryptogotchi";
import { FetchLeaderBoard } from "@crypto-koi/common/lib/graphql/queries/__generated__/FetchLeaderBoard";
import { commonStyles } from "../styles/commonStyles";
import { CustomColors } from "../styles/colors";
import GradientBackground from "../components/GradientBackground";

const style = StyleSheet.create({
    header: {
        paddingTop: StatusBar.currentHeight ?? 0 + 5,
    },
});

const Leaderboard = observer(() => {
    const tailwind = useTailwind();
    const { fetchMore, data, refetch, loading } = useQuery<FetchLeaderBoard>(
        FETCH_LEADERBOARD,
        {
            variables: { offset: 0, limit: 20 },
        }
    );

    return (
        <SafeAreaView style={tailwind("flex-1 flex-col")}>
            <StatusBar barStyle={"light-content"} />
            <View style={tailwind("absolute")}>
                <GradientBackground inSafeAreaView={true} />
            </View>
            <View
                style={[
                    tailwind("px-4 pb-3"),
                    style.header,
                    { backgroundColor: CustomColors.bgDark },
                ]}
            >
                <View style={tailwind("mt-3")}>
                    <Text
                        style={[
                            commonStyles.screenTitle,
                            tailwind("pt-1"),
                            { color: CustomColors.onSecondary },
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
                refreshControl={
                    <RefreshControl onRefresh={refetch} refreshing={loading} />
                }
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
