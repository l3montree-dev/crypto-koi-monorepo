import { useMutation } from "@apollo/client";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Notifications, Registered } from "react-native-notifications";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { CREATE_CRYPTOGOTCHI_MUTATION } from "../graphql/queries/cryptogotchi";
import { ACCEPT_PUSH_NOTIFICATIONS } from "../graphql/queries/user";
import {
    AcceptPushNotifications,
    AcceptPushNotificationsVariables,
} from "../graphql/queries/__generated__/AcceptPushNotifications";
import {
    CreateCryptogotchi,
    CreateCryptogotchiVariables,
} from "../graphql/queries/__generated__/CreateCryptogotchi";
import useAppState from "../hooks/useAppState";
import { userService } from "../services/UserService";
import { DimensionUtils } from "../utils/DimensionUtils";
import CryptogotchiView from "../views/CryptogotchiView";

const style = StyleSheet.create({
    slide: {
        width: Dimensions.get("window").width,
    },
    dot: {
        height: 10,
        width: 10,
    },
});

const FriendsScreen = observer(() => {
    const cryptogotchies = useAppState(
        (rootStore) => rootStore.authStore.currentUser?.cryptogotchies
    );

    const [active, setActive] = useState(0);
    const theme = useAppState((rootStore) => rootStore.themeStore);

    const tailwind = useTailwind();
    const [refreshing, setRefreshing] = React.useState(false);

    const scrollPosition = useSharedValue(0);

    const scrollHandler = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollPosition.value = ev.nativeEvent.contentOffset.x;
        setActive(
            Math.floor(
                ev.nativeEvent.contentOffset.x / DimensionUtils.deviceWidth
            )
        );
    };

    const animatedActiveDotStyle = useAnimatedStyle(() => {
        "worklet";
        return {
            transform: [
                {
                    translateX: withSpring(
                        (scrollPosition.value /
                            (DimensionUtils.deviceWidth * 3)) *
                            79
                    ),
                },
            ],
        };
    });

    const handleRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await userService.sync();
        } finally {
            setRefreshing(false);
        }
    }, []);

    const [createCryptogotchi, { loading }] = useMutation<
        CreateCryptogotchi,
        CreateCryptogotchiVariables
    >(CREATE_CRYPTOGOTCHI_MUTATION);

    const [acceptPushNotifications] = useMutation<
        AcceptPushNotifications,
        AcceptPushNotificationsVariables
    >(ACCEPT_PUSH_NOTIFICATIONS);

    const handleCreateCryptogotchi = React.useCallback(async () => {
        await createCryptogotchi();
        // just do a full refresh
        return userService.sync();
    }, []);

    useEffect(() => {
        Notifications.registerRemoteNotifications();

        Notifications.events().registerRemoteNotificationsRegistered(
            (event: Registered) => {
                return acceptPushNotifications({
                    variables: { pushNotificationToken: event.deviceToken },
                });
            }
        );
    }, []);

    if (!cryptogotchies) {
        return null;
    }

    return (
        <View style={tailwind("flex-1")}>
            <View style={tailwind("flex-1")}>
                <ScrollView
                    pagingEnabled
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {cryptogotchies.map((cryptogotchi, index) => (
                        <View key={cryptogotchi.id} style={style.slide}>
                            <CryptogotchiView
                                isVisible={active === index}
                                onRefresh={handleRefresh}
                                refreshing={refreshing}
                                clockIdPrefix="friend-screen"
                                cryptogotchi={cryptogotchi}
                            />
                        </View>
                    ))}

                    {/* <View
                        style={[
                            style.slide,
                            { backgroundColor: theme.secondaryColor },
                        ]}
                    >
                        <View
                            style={tailwind(
                                "mx-4 flex-col justify-center flex-1"
                            )}
                        >
                            <View
                                style={tailwind(
                                    "flex-row justify-center mb-10"
                                )}
                            >
                                <Icon
                                    size={150}
                                    name="egg-easter"
                                    color={theme.onSecondary}
                                />
                            </View>

                            <AppButton
                                onPress={handleCreateCryptogotchi}
                                loading={loading}
                                textColor={theme.buttonTextColor}
                                backgroundColor={theme.buttonBackgroundColor}
                                title="Create new CryptoKoi"
                            />
                        </View>
                                </View> */}
                </ScrollView>
            </View>
            {cryptogotchies.length > 1 && (
                <View
                    style={tailwind(
                        "absolute bottom-4 w-full justify-center items-center"
                    )}
                >
                    <View style={tailwind("flex-row")}>
                        {cryptogotchies.map((cryptogotchi) => (
                            <View
                                key={cryptogotchi.id}
                                style={[
                                    tailwind(
                                        "bg-white opacity-50 mx-2 rounded"
                                    ),
                                    style.dot,
                                ]}
                            />
                        ))}

                        <Animated.View
                            style={[
                                style.dot,
                                tailwind("bg-white rounded  absolute mx-2"),
                                animatedActiveDotStyle,
                            ]}
                        />
                        {/*<View
                        style={[
                            tailwind(
                                "bg-white flex-row justify-center items-center mx-2 rounded"
                            ),
                            style.dot,
                        ]}
                    >
                        <Icon color={"rgba(0,0,0,1)"} size={10} name={"plus"} />
                    </View>*/}
                    </View>
                </View>
            )}
        </View>
    );
});

export default FriendsScreen;
