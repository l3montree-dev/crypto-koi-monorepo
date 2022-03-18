import { useMutation } from "@apollo/client";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import {
    Alert,
    Linking,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { config } from "../config";
import { CONNECT_WALLET_MUTATION } from "../graphql/queries/user";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    ConnectWallet,
    ConnectWalletVariables,
} from "../graphql/queries/__generated__/ConnectWallet";
import useAppState from "../hooks/useAppState";
import { selectCurrentUser, selectThemeStore } from "../mobx/selectors";
import { userService } from "../services/UserService";
import { commonStyles } from "../styles/commonStyles";
import ViewUtils from "../utils/ViewUtils";
import { useNavigation } from "../hooks/useNavigation";

const style = StyleSheet.create({
    header: {
        paddingTop: StatusBar.currentHeight ?? 0 + 5,
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(125, 125, 125, 1)",
    },
});

export const ProfileTab = observer(() => {
    const themeStore = useAppState(selectThemeStore);
    const user = useAppState(selectCurrentUser);
    const tailwind = useTailwind();
    const c = useMemo(() => ({ color: themeStore.onSecondary }), [
        themeStore.onSecondary,
    ]);

    const connector = useWalletConnect();

    const [connectWallet, { loading }] = useMutation<
        ConnectWallet,
        ConnectWalletVariables
    >(CONNECT_WALLET_MUTATION);

    const handleLogout = () => {
        userService.logout();
    };

    const handleConnectWallet = async () => {
        const provider = new WalletConnectProvider({
            rpc: {
                [config.chain.networkId]: config.chain.rpc[0],
            },
            chainId: config.chain.networkId,
            connector: connector,
            qrcode: false,
        });

        await provider.enable();

        try {
            await connectWallet({
                variables: { walletAddress: provider.accounts[0] },
            });
            ViewUtils.toast("Wallet successfully connected");
        } catch (e) {
            ViewUtils.toast(
                "Error connecting wallet - Is this wallet already used by another account?",
                5
            );
        }
    };

    const onButtonColor = useMemo(
        () => ({ color: themeStore.buttonTextColor }),
        [themeStore.buttonTextColor]
    );

    const { navigate } = useNavigation();

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure that you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        await userService.deleteAccount();
                        ViewUtils.toast("Account deleted");
                    },
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <SafeAreaView
            style={[
                tailwind("flex-1 flex-col"),
                { backgroundColor: themeStore.secondaryColor },
            ]}
        >
            <View
                style={[
                    tailwind("px-4 mt-3 pb-3"),
                    style.header,
                    { backgroundColor: themeStore.secondaryColor },
                ]}
            >
                <Text style={[commonStyles.screenTitle, tailwind("pt-1"), c]}>
                    Profile
                </Text>
            </View>
            <View style={tailwind("mx-4 mt-5")}>
                <View style={tailwind("mb-5")}>
                    {user?.walletAddress ? (
                        <View style={tailwind("mb-5")}>
                            <Text style={[tailwind("mb-2"), c]}>
                                Connected Wallet
                            </Text>
                            <View
                                style={[
                                    tailwind(
                                        "flex-row items-center p-4 rounded-lg"
                                    ),
                                    {
                                        backgroundColor:
                                            themeStore.buttonBackgroundColor,
                                    },
                                ]}
                            >
                                <Icon
                                    size={24}
                                    style={tailwind("opacity-75 mr-2")}
                                    color={themeStore.buttonTextColor}
                                    name="wallet"
                                />

                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="middle"
                                    style={[onButtonColor, tailwind("flex-1")]}
                                >
                                    {user?.walletAddress}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={[c, tailwind("mb-2")]}>
                                Your CryptoKoi is currently not connected to any
                                wallet. If you uninstall the App, it will be
                                lost.
                            </Text>
                            <AppButton
                                loading={loading}
                                title="Connect Wallet"
                                onPress={handleConnectWallet}
                                textColor={themeStore.buttonTextColor}
                                backgroundColor={
                                    themeStore.buttonBackgroundColor
                                }
                            />
                        </View>
                    )}
                </View>
                <View
                    style={[
                        tailwind("mb-4 rounded-lg"),
                        { backgroundColor: themeStore.buttonBackgroundColor },
                    ]}
                >
                    <TouchableNativeFeedback
                        onPress={() =>
                            navigate("CMSScreen", {
                                link: "/app-imprint",
                                title: "Imprint",
                            })
                        }
                    >
                        <View style={[tailwind("p-4"), style.listItem]}>
                            <Text style={{ color: themeStore.buttonTextColor }}>
                                Imprint
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() =>
                            Linking.openURL(config.privacyPolicyLink)
                        }
                    >
                        <View style={[tailwind("p-4"), style.listItem]}>
                            <Text style={{ color: themeStore.buttonTextColor }}>
                                Privacy Policy
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() =>
                            Linking.openURL(config.termsOfServiceLink)
                        }
                    >
                        <View style={[tailwind("p-4"), style.listItem]}>
                            <Text style={{ color: themeStore.buttonTextColor }}>
                                Terms of Use
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() =>
                            Linking.openURL(
                                config.websiteBaseUrl +
                                    "/cryptokoi-app-open-source-licenses_2022_03_18.txt"
                            )
                        }
                    >
                        <View style={[tailwind("p-4"), style.listItem]}>
                            <Text style={{ color: themeStore.buttonTextColor }}>
                                Open-Source Licenses
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={handleDeleteAccount}>
                        <View style={tailwind("p-4 flex-row items-center")}>
                            <Icon
                                size={24}
                                style={tailwind("mr-2 opacity-75")}
                                name="delete-outline"
                                color={themeStore.buttonTextColor}
                            />
                            <Text style={{ color: themeStore.buttonTextColor }}>
                                Delete account
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <AppButton
                    title="Logout"
                    onPress={handleLogout}
                    textColor={themeStore.buttonTextColor}
                    backgroundColor={themeStore.buttonBackgroundColor}
                />
            </View>
        </SafeAreaView>
    );
});
