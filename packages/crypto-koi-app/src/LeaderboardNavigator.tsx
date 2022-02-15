import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import Leaderboard from "./screens/LeaderboardScreen";
import { commonStyles } from "./styles/commonStyles";

const style = StyleSheet.create({
    header: {
        paddingTop: StatusBar.currentHeight ?? 0 + 5,
    },
    icon: {
        fontSize: 60,
        lineHeight: 60,
    },
    /*absolutePos: {
        marginTop: StatusBar.currentHeight ?? 0 + 5,
        marginRight: 20,
        marginLeft: 20,
    },
    searchContainer: {
        // height: 40,
    },*/
});

const ComingSoon = () => {
    const tailwind = useTailwind();
    return (
        <View style={tailwind("flex-col items-center justify-center flex-1")}>
            <Icon
                style={[tailwind("text-white opacity-50"), style.icon]}
                name="gamepad-variant-outline"
            />
            <Text style={tailwind("text-white opacity-50")}>
                Coming soon...
            </Text>
        </View>
    );
};

const Tab = createMaterialTopTabNavigator();

const LeaderboardNavigator = () => {
    const tailwind = useTailwind();
    /*const width = useSharedValue(100);
    const animatedProps = useAnimatedStyle(() => {
        return {
            left: width.value + "%",
            opacity: 1 - width.value / 100,
            zIndex: width.value < 100 ? 1 : -1,
        };
    });*/
    return (
        <>
            <View style={[tailwind("px-4 pb-3 bg-slate-900"), style.header]}>
                <Text style={[commonStyles.screenTitle, tailwind("pt-1")]}>
                    Leaderboard
                </Text>
                {/* <View style={[tailwind("absolute right-0"), style.absolutePos]}>
                    <Icon
                        onPress={() => (width.value = withTiming(0))}
                        style={tailwind("text-white text-2xl p-2")}
                        name={"magnify"}
                    />
                </View>
                <Animated.View
                    style={[
                        tailwind("absolute pt-1 flex-row right-0"),
                        animatedProps,
                        style.absolutePos,
                        style.searchContainer,
                    ]}
                >
                    <View style={tailwind("flex-1")}>
                        <SearchInput
                            onClose={() => (width.value = withTiming(100))}
                            style={tailwind("bg-slate-600")}
                        />
                    </View>
                </Animated.View> */}
            </View>
            <View style={tailwind("bg-slate-900 flex-1")}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: [
                            tailwind("bg-slate-900"),
                            { elevation: 0 },
                        ],
                        tabBarActiveTintColor: tailwind("text-white")
                            .color as string,
                        tabBarIndicatorStyle: tailwind("bg-amber-500"),
                    }}
                    sceneContainerStyle={tailwind("bg-slate-900")}
                >
                    <Tab.Screen name="User" component={Leaderboard} />
                    <Tab.Screen name="Games" component={ComingSoon} />
                </Tab.Navigator>
            </View>
        </>
    );
};

export default LeaderboardNavigator;
