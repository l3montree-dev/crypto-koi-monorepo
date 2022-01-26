import { ApolloProvider } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { AppStateContext } from "./mobx/AppStateContext";
import { rootStore } from "./mobx/RootStore";
import RootStackNavigator from "./RootStackNavigator";
import { apolloClient } from "./services/ApolloClient";
import { userService } from "./services/UserService";
import { Colors } from "./styles/colors";
import * as SplashScreen from "expo-splash-screen";
import log from "./utils/logger";
import { Platform, View } from "react-native";

if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(Colors.bgColorVariant);
}
// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
    /* reloading the app might trigger some race conditions, ignore them */
});
const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(255, 45, 85)",
        background: Colors.bgColor,
    },
};

const containerStyle = { flex: 1, backgroundColor: Colors.bgColor };

const App: FunctionComponent = () => {
    useEffect(() => {
        // start the login routine.
        (async function () {
            try {
                log.info("Boot");
                await userService.tryToLogin();
            } catch (e) {
                log.warn("login failed with:", e);
            } finally {
                setTimeout(() => {
                    return SplashScreen.hideAsync();
                }, 1000);
            }
        })();
    }, []);

    return (
        <ApolloProvider client={apolloClient}>
            <AppStateContext.Provider value={rootStore}>
                <SafeAreaProvider>
                    <TailwindProvider utilities={utilities}>
                        <StatusBar translucent />
                        <View style={containerStyle}>
                            <NavigationContainer theme={Theme}>
                                <RootStackNavigator />
                            </NavigationContainer>
                        </View>
                    </TailwindProvider>
                </SafeAreaProvider>
            </AppStateContext.Provider>
        </ApolloProvider>
    );
};

export default App;
