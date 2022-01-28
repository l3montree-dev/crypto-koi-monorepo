import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import SearchInput from "./components/SearchInput";
import Leaderboard from "./screens/Leaderboard";
import { commonStyles } from "./styles/commonStyles";

const style = StyleSheet.create({
    header: {
        paddingTop: StatusBar.currentHeight,
    },
    icon: {
        fontSize: 60,
        lineHeight: 60,
    },
    absolutePos: {
        marginTop: StatusBar.currentHeight,
        marginRight: 20,
        marginLeft: 20,
    },
    searchContainer: {
        // height: 40,
    },
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

function LeaderboardNavigator() {
    const tailwind = useTailwind();
    const width = useSharedValue(100);
    const animatedProps = useAnimatedStyle(() => {
        return {
            left: width.value + "%",
            opacity: 1 - width.value / 100,
            zIndex: width.value < 100 ? 1 : -1,
        };
    });
    return (
        <>
            <View
                style={[tailwind("px-4 pt-1 pb-3 bg-violet-900"), style.header]}
            >
                <Text style={commonStyles.screenTitle}>Leaderboard</Text>
                <View style={[tailwind("absolute right-0"), style.absolutePos]}>
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
                            style={tailwind("bg-violet-400")}
                        />
                    </View>
                </Animated.View>
            </View>
            <View style={tailwind("bg-violet-900 flex-1")}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: [
                            tailwind("bg-violet-800"),
                            { elevation: 0 },
                        ],
                        tabBarActiveTintColor: tailwind("text-white")
                            .color as string,
                        tabBarIndicatorStyle: tailwind("bg-amber-500"),
                    }}
                    sceneContainerStyle={tailwind("bg-violet-900")}
                >
                    <Tab.Screen name="User" component={Leaderboard} />
                    <Tab.Screen name="Games" component={ComingSoon} />
                </Tab.Navigator>
            </View>
        </>
    );
}

export default LeaderboardNavigator;
