import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useAppState from "./hooks/useAppState";
import { RootStackParamList } from "./hooks/useNavigation";
import { selectCurrentUser } from "@crypto-koi/common/lib/mobx/selectors";
import CMSScreen from "./screens/CMSScreen";
import CryptogotchiScreen from "./screens/CryptogotchiScreen";
import FriendEditScreen from "./screens/FriendEditScreen";
import SnakeGameScreen from "./screens/games/snake/SnakeGameScreen";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { commonStyles } from "./styles/commonStyles";
import { TabNavigator } from "./TabNavigator";
import { DimensionUtils } from "./utils/DimensionUtils";
import { CustomColors } from "./styles/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
                            animation: "slide_from_right",
                            headerShadowVisible: false,
                            headerTintColor: CustomColors.bgDark,
                            headerStyle: {
                                backgroundColor: CustomColors.secondaryColor,
                            },
                            // there is no way to redirect back
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CMSScreen"
                        component={CMSScreen}
                        options={({ route }) => {
                            return {
                                animation: "slide_from_right",
                                headerShadowVisible: false,
                                headerTintColor: CustomColors.onSecondary,
                                headerStyle: {
                                    backgroundColor:
                                        CustomColors.secondaryColor,
                                },
                                headerShown: true,
                                headerTransparent: false,
                                headerTitle: route.params.title,
                            };
                        }}
                    />
                    <Stack.Screen
                        name="FriendEditScreen"
                        component={FriendEditScreen}
                        options={({ route }) => {
                            return {
                                animation: "slide_from_right",
                                headerShadowVisible: false,
                                headerTintColor: CustomColors.onSecondary,
                                headerStyle: {
                                    backgroundColor:
                                        CustomColors.secondaryColor,
                                },
                                headerShown: true,
                                headerTransparent: true,
                                headerTitle: () => (
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={[
                                            commonStyles.screenTitle,
                                            {
                                                maxWidth:
                                                    DimensionUtils.deviceWidth -
                                                    (!route.params.isAlive
                                                        ? 150
                                                        : 100),
                                                color: CustomColors.onSecondary,
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
                                                            CustomColors.onSecondary,
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
                            animation: "slide_from_right",
                            headerShadowVisible: false,
                            headerTintColor: CustomColors.onSecondary,
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
                        options={{
                            animation: "slide_from_right",
                            headerShadowVisible: false,
                            headerTintColor: CustomColors.onSecondary,
                            headerStyle: {
                                backgroundColor: CustomColors.secondaryColor,
                            },
                        }}
                    />
                </>
            ) : (
                <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{
                        animation: "slide_from_right",
                        headerShadowVisible: false,
                        headerTintColor: CustomColors.bgDark,
                        headerStyle: {
                            backgroundColor: CustomColors.secondaryColor,
                        },
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    );
});

export default RootStackNavigator;
