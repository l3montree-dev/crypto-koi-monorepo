import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import RootStackNavigator from "./RootStackNavigator";
import { Colors } from "./styles/colors";

NavigationBar.setBackgroundColorAsync(Colors.bgColorVariant);

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(255, 45, 85)",
        background: Colors.bgColor,
    },
};

const style = {
    backgroundColor: Colors.bgColor,
    flex: 1,
};
const App: FunctionComponent = () => {
    return (
        <SafeAreaProvider>
            <TailwindProvider utilities={utilities}>
                <StatusBar translucent />
                <NavigationContainer theme={Theme}>
                    <RootStackNavigator />
                </NavigationContainer>
            </TailwindProvider>
        </SafeAreaProvider>
    );
};

export default App;
