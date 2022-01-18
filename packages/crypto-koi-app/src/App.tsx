import { NavigationContainer } from "@react-navigation/native";
import { FunctionComponent } from "react";
import StackNavigator from "./StackNavigator";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

NavigationBar.setBackgroundColorAsync("#4c1d95");
const App: FunctionComponent = () => {
    return (
        <SafeAreaProvider>
            <TailwindProvider utilities={utilities}>
                <StatusBar translucent />
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </TailwindProvider>
        </SafeAreaProvider>
    );
};

export default App;
