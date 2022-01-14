import { NavigationContainer } from "@react-navigation/native";
import { FunctionComponent } from "react";
import StackNavigator from "./StackNavigator";

const App: FunctionComponent = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default App;
