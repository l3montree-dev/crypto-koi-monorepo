import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useAppState from "./hooks/useAppState";
import { RootStackParamList } from "./hooks/useNavigation";
import { selectCurrentUser } from "./mobx/selectors";
import FriendEditScreen from "./screens/FriendEditScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { Colors } from "./styles/colors";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const commonNavigationOptions: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: Colors.bgColorVariant,
    },
    headerTitleAlign: "center",
};

const style = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    icon: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 30,
    },
});
const RootStackNavigator: FunctionComponent = observer(() => {
    const currentUser = useAppState(selectCurrentUser);
    return (
        <Stack.Navigator>
            {currentUser ? (
                <>
                    <Stack.Screen
                        name="TabNavigator"
                        component={TabNavigator}
                        options={{
                            ...commonNavigationOptions,
                            // there is no way to redirect back
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="FriendEditScreen"
                        component={FriendEditScreen}
                        options={({ route }) => {
                            return {
                                ...commonNavigationOptions,
                                headerTitle: () => (
                                    <Text style={style.title}>
                                        {route.params.name}
                                        <Icon
                                            style={style.icon}
                                            name="grave-stone"
                                        />
                                    </Text>
                                ),
                            };
                        }}
                    />
                    <Stack.Screen
                        name="SnakeGameScreen"
                        component={SnakeGameScreen}
                        options={commonNavigationOptions}
                    />
                </>
            ) : (
                <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{
                        ...commonNavigationOptions,
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    );
});

export default RootStackNavigator;
