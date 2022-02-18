import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useMemo } from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useAppState from "./hooks/useAppState";
import { RootStackParamList } from "./hooks/useNavigation";
import { selectCurrentUser, selectThemeStore } from "./mobx/selectors";
import CryptogotchiScreen from "./screens/CryptogotchiScreen";
import FriendEditScreen from "./screens/FriendEditScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { commonStyles } from "./styles/commonStyles";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator: FunctionComponent = observer(() => {
    const currentUser = useAppState(selectCurrentUser);
    const themeStore = useAppState(selectThemeStore);

    const commonNavigationOptions: NativeStackNavigationOptions = useMemo(
        () => ({
            animation: "slide_from_right",
            headerShadowVisible: false,
            headerTintColor: themeStore.currentHeaderTintColor,
            headerStyle: {
                backgroundColor: themeStore.secondaryColor,
            },
            headerTitleAlign: "center",
        }),
        [themeStore.secondaryColor, themeStore.currentHeaderTintColor]
    );
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
                                headerShown: true,
                                headerTransparent: true,
                                headerTitle: () => (
                                    <Text
                                        style={[
                                            commonStyles.screenTitle,
                                            {
                                                color: themeStore.onSecondary,
                                            },
                                        ]}
                                    >
                                        {route.params.name}
                                        {!route.params.isAlive && (
                                            <Icon
                                                style={[
                                                    commonStyles.screenIcon,
                                                    {
                                                        color:
                                                            themeStore.onSecondary,
                                                    },
                                                ]}
                                                name="grave-stone"
                                            />
                                        )}
                                    </Text>
                                ),
                            };
                        }}
                    />
                    <Stack.Screen
                        name="CryptogotchiScreen"
                        options={{
                            ...commonNavigationOptions,
                            headerTitle: "",
                            title: "",
                            headerTransparent: true,
                            headerStyle: {
                                backgroundColor: "transparent",
                            },
                        }}
                        component={CryptogotchiScreen}
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
