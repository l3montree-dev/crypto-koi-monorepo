import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LeaderboardNavigator from "./LeaderboardNavigator";
import FriendScreen from "./screens/FriendScreen";
import { Colors } from "./styles/colors";

const Tab = createMaterialBottomTabNavigator();

const SettingsScreen = () => {
    return null;
};

const style = {
    backgroundColor: Colors.bgColorVariant,
    //borderTopWidth: 1,
    //borderTopColor: "rgba(255,255,255,0.2)",
    elevation: 0,
};
export function TabNavigator() {
    return (
        <Tab.Navigator
            shifting
            activeColor="white"
            inactiveColor={"rgba(255,255,255,0.5)"}
            barStyle={style}
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
                component={LeaderboardNavigator}
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
            />
        </Tab.Navigator>
    );
}
