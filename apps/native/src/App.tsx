import { ApolloProvider } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Event } from "@sentry/react-native";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import * as Sentry from "sentry-expo";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { AppStateContext } from "./mobx/AppStateContext";
import { nativeRootStore } from "./mobx/NativeRootStore";
import RootStackNavigator from "./RootStackNavigator";
import { nativeApolloClient } from "./services/NativeApolloClient";
import { nativeEventEmitter } from "./services/NativeAppEventEmitter";
import { nativeUserService } from "./services/NativeUserService";
import { CustomColors } from "./styles/colors";
import log from "./utils/logger";
import ViewUtils from "./utils/ViewUtils";

Sentry.init({
    dsn: "https://90d34b820d86480082c5361bc6b3d7ed@sentry.l3montree.com/13",
    enableInExpoDevelopment: false,
    debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    beforeSend(event: Event) {
        // Modify the captured event
        if (event.user) {
            // Don't send user's personal data
            delete event.user.ip_address;
            delete event.user.id;
            delete event.dist;
        }
        return event;
    },
});

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(255, 45, 85)",
        background: CustomColors.bgDark,
    },
};

const containerStyle = { flex: 1, backgroundColor: "red" };

const App: FunctionComponent = () => {
    useEffect(() => {
        // start the login routine.
        (async function () {
            try {
                log.info("Boot");
                const user = await nativeUserService.tryToLogin();
                nativeRootStore.authStore.setCurrentUser(user);
            } catch (e) {
                log.warn("login failed with:", e);
            } finally {
                setTimeout(() => {
                    return SplashScreen.hide();
                }, 1000);
            }
        })();

        const unsub1 = nativeEventEmitter.registerListener(
            "successfulRedeem",
            () => {
                ViewUtils.toast("Redeem successful");
            }
        );

        const unsub2 = nativeEventEmitter.registerListener(
            "failedRedeem",
            () => {
                ViewUtils.toast("Redeem failed");
            }
        );
        return () => {
            unsub1();
            unsub2();
        };
    }, []);

    return (
        <RootSiblingParent>
            <ApolloProvider client={nativeApolloClient}>
                <AppStateContext.Provider value={nativeRootStore}>
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
