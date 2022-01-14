import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FunctionComponent } from "react";
import HomeScreen from "./HomeScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";

const Stack = createNativeStackNavigator();

const StackNavigator: FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SnakeGameScreen" component={SnakeGameScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
