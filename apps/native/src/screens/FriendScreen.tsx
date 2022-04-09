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
import { useTailwind } from "tailwind-rn";
import { ACCEPT_PUSH_NOTIFICATIONS } from "@crypto-koi/common/lib/graphql/queries/user";
import {
    AcceptPushNotifications,
    AcceptPushNotificationsVariables,
} from "@crypto-koi/common/lib/graphql/queries/__generated__/AcceptPushNotifications";
import useAppState from "../hooks/useAppState";
import { nativeUserService } from "../services/NativeUserService";
import { DimensionUtils } from "../utils/DimensionUtils";
import CryptogotchiView from "../views/CryptogotchiView";
import { selectCryptogotchies } from "@crypto-koi/common/lib/mobx/selectors";

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
    const cryptogotchies = useAppState(selectCryptogotchies);

    // const [nftLoading, setNftLoading] = useState(false);

    const [active, setActive] = useState(0);
    // const theme = useAppState((rootStore) => rootStore.themeStore);

    const tailwind = useTailwind();
    const [refreshing, setRefreshing] = React.useState(false);

    const scrollPosition = useSharedValue(0);
    // const connector = useWalletConnect();

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
            await nativeUserService.sync();
        } finally {
            setRefreshing(false);
        }
    }, []);

    const [acceptPushNotifications] = useMutation<
        AcceptPushNotifications,
        AcceptPushNotificationsVariables
    >(ACCEPT_PUSH_NOTIFICATIONS);
    /*
    const [createCryptogotchi, { loading }] = useMutation<
        CreateCryptogotchi,
        CreateCryptogotchiVariables
    >(CREATE_CRYPTOGOTCHI_MUTATION);

  

    const handleCreateCryptogotchi = React.useCallback(async () => {
        setNftLoading(true);
        if (!connector.connected) {
            await connector.connect();
        }

        const provider = newProvider(connector, config.chain);

        if (connector.chainId !== config.chain.networkId) {
            try {
                await switchOrAddNetwork(provider, config.chain);
            } catch (e) {
                ViewUtils.toast(
                    "Please switch your wallet application to the " +
                        config.chain.name +
                        " network and restart the application"
                );
                setNftLoading(false);
                return;
            }
        }

        await provider.enable();

        const cryptoKoiContract = new CryptoKoiSmartContract(provider);

        const result = await createCryptogotchi({
            variables: {
                walletAddress: cryptoKoiContract.getUserAddress(),
            },
        });

        if (!result.data) {
            return;
        }

        log.info("calling contract redeem");
        ViewUtils.toast("Making NFT... This might take a while");
        try {
            const receipt = await cryptoKoiContract.redeem(
                result.data.createCryptogotchi.tokenId,
                result.data.createCryptogotchi.signature
            );
            appEventEmitter.emit("successfulRedeem", receipt);
            log.info("successful transaction - full refresh");
            await userService.sync();
        } catch (e) {
            log.error("transaction failed", e);
            appEventEmitter.emit("failedRedeem", e);
        } finally {
            setNftLoading(false);
        }
    }, []);*/

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
                                loading={loading || nftLoading}
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
