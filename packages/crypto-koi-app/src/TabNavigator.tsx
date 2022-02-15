import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { observer } from "mobx-react-lite";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LeaderboardNavigator from "./LeaderboardNavigator";
import { rootStore } from "./mobx/RootStore";
import FriendScreen from "./screens/FriendScreen";
import Leaderboard from "./screens/LeaderboardScreen";

const Tab = createMaterialBottomTabNavigator();

const style = {
    //borderTopWidth: 1,
    //borderTopColor: "rgba(255,255,255,0.2)",
    elevation: 0,
};
export const TabNavigator = observer(() => {
    const backgroundColor = rootStore.tabBarColor;
    return (
        <Tab.Navigator
            shifting
            activeColor="white"
            inactiveColor={"rgba(255,255,255,0.5)"}
            barStyle={[style, { backgroundColor }]}
        >
            <Tab.Screen
                name="Friend"
                component={FriendScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="egg-easter"
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
            {/*  <Tab.Screen
                name="Profile"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="face"
                            color={color}
                            size={24}
                        />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
});
