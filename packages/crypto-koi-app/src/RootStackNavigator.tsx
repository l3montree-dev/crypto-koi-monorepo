import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React, { FunctionComponent } from "react";

import HomeScreen from "./FriendsScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { Colors } from "./styles/colors";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

const commonNavigationOptions: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: Colors.bgColorVariant,
    },
    headerTitleAlign: "center",
};

const RootStackNavigator: FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                    ...commonNavigationOptions,
                    // there is no way to redirect back
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{
                    ...commonNavigationOptions,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SnakeGameScreen"
                component={SnakeGameScreen}
                options={commonNavigationOptions}
            />
        </Stack.Navigator>
    );
};

export default RootStackNavigator;
