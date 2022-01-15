import { NavigationContainer } from "@react-navigation/native";
import { FunctionComponent } from "react";
import StackNavigator from "./StackNavigator";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";

const App: FunctionComponent = () => {
    return (
        <TailwindProvider utilities={utilities}>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </TailwindProvider>
    );
};

export default App;
