import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { observer } from "mobx-react-lite";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tinycolor from "tinycolor2";
import useAppState from "./hooks/useAppState";
import { selectThemeStore } from "./mobx/selectors";
import FriendScreen from "./screens/FriendScreen";
import Leaderboard from "./screens/LeaderboardScreen";
import { ProfileTab } from "./screens/ProfileTab";

const Tab = createMaterialBottomTabNavigator();

const style = {
    //borderTopWidth: 1,
    //borderTopColor: "rgba(255,255,255,0.2)",
    elevation: 0,
};
export const TabNavigator = observer(() => {
    const themeStore = useAppState(selectThemeStore);

    return (
        <Tab.Navigator
            shifting
            activeColor={themeStore.onSecondary}
            inactiveColor={tinycolor(themeStore.onSecondary)
                .setAlpha(0.5)
                .toRgbString()}
            barStyle={[style, { backgroundColor: themeStore.tabBarColor }]}
        >
            <Tab.Screen
                name="CryptoKoi"
                component={FriendScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="fish"
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Leaderboard"
                component={Leaderboard}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="trophy"
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="face"
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
});
