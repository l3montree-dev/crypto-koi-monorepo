import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FunctionComponent } from "react";
import HomeScreen from "./HomeScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";

const Stack = createNativeStackNavigator();

const commonNavigationOptions = {
    headerShadowVisible: false,
};

const StackNavigator: FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ ...commonNavigationOptions, headerShown: false }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={commonNavigationOptions}
            />
            <Stack.Screen
                name="SnakeGameScreen"
                component={SnakeGameScreen}
                options={commonNavigationOptions}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
