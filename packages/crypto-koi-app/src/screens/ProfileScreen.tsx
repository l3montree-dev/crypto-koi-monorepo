import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useTailwind } from "tailwind-rn";
import useAppState from "../hooks/useAppState";
import { selectCurrentUser, selectThemeStore } from "../mobx/selectors";
import { commonStyles } from "../styles/commonStyles";
import { observer } from "mobx-react-lite";
import { AppButton } from "../components/AppButton";
import { authStore } from "../mobx/RootStore";
import { userService } from "../services/UserService";
import { useMutation } from "@apollo/client";
import { CONNECT_WALLET_MUTATION } from "../graphql/queries/user";
import {
    ConnectWallet,
    ConnectWalletVariables,
} from "../graphql/queries/__generated__/ConnectWallet";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { config } from "../config";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import ViewUtils from "../utils/ViewUtils";

const style = StyleSheet.create({
    header: {
        paddingTop: StatusBar.currentHeight ?? 0 + 5,
    },
});

export const ProfileScreen = observer(() => {
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
                [config.chainId]: config.chainUrl,
            },
            chainId: config.chainId,
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
                                    tailwind("p-2 rounded-lg"),
                                    {
                                        backgroundColor:
                                            themeStore.primaryColor,
                                    },
                                ]}
                            >
                                <Text style={{ color: themeStore.onSecondary }}>
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
