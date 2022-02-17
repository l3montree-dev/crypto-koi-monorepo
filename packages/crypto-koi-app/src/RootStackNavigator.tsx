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
import { rootStore } from "./mobx/RootStore";
import { selectCurrentUser } from "./mobx/selectors";
import CryptogotchiScreen from "./screens/CryptogotchiScreen";
import FriendEditScreen from "./screens/FriendEditScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { commonStyles } from "./styles/commonStyles";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator: FunctionComponent = observer(() => {
    const currentUser = useAppState(selectCurrentUser);

    const commonNavigationOptions: NativeStackNavigationOptions = useMemo(
        () => ({
            headerShadowVisible: false,
            headerTintColor: rootStore.onBackground,
            headerStyle: {
                backgroundColor: rootStore.secondaryColor,
            },
            headerTitleAlign: "center",
        }),
        [rootStore.secondaryColor, rootStore.onSecondary]
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
                                headerTitle: () => (
                                    <Text
                                        style={[
                                            commonStyles.screenTitle,
                                            {
                                                color: rootStore.onSecondary,
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
                                                            rootStore.onSecondary,
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
