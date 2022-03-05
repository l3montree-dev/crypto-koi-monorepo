import { ApolloProvider } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { AppStateContext } from "./mobx/AppStateContext";
import { rootStore } from "./mobx/RootStore";
import RootStackNavigator from "./RootStackNavigator";
import { apolloClient } from "./services/ApolloClient";
import { userService } from "./services/UserService";
import { Colors } from "./styles/colors";
import log from "./utils/logger";
import { RootSiblingParent } from "react-native-root-siblings";
import { appEventEmitter } from "./services/AppEventEmitter";
import ViewUtils from "./utils/ViewUtils";

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(255, 45, 85)",
        background: Colors.bgColor,
    },
};

const containerStyle = { flex: 1, backgroundColor: "red" };

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
                    return SplashScreen.hide();
                }, 1000);
            }
        })();

        const unsub1 = appEventEmitter.registerListener(
            "successfulRedeem",
            () => {
                ViewUtils.toast("Redeem successful");
            }
        );

        const unsub2 = appEventEmitter.registerListener("failedRedeem", () => {
            ViewUtils.toast("Redeem failed");
        });
        return () => {
            unsub1();
            unsub2();
        };
    }, []);

    return (
        <RootSiblingParent>
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
        </RootSiblingParent>
    );
};

export default App;
