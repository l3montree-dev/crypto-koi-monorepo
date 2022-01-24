import { ApolloProvider } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import RootStackNavigator from "./RootStackNavigator";
import { apolloClient } from "./services/ApolloClient";
import { userService } from "./services/UserService";
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

const App: FunctionComponent = () => {
    useEffect(() => {
        // start the login routine.
        userService.tryToLogin();
    }, []);
    return (
        <ApolloProvider client={apolloClient}>
            <SafeAreaProvider>
                <TailwindProvider utilities={utilities}>
                    <StatusBar translucent />
                    <NavigationContainer theme={Theme}>
                        <RootStackNavigator />
                    </NavigationContainer>
                </TailwindProvider>
            </SafeAreaProvider>
        </ApolloProvider>
    );
};

export default App;
