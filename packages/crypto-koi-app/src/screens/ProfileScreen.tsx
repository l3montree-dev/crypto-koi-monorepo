import { useMutation } from "@apollo/client";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { config } from "../config";
import { CONNECT_WALLET_MUTATION } from "../graphql/queries/user";
import {
    ConnectWallet,
    ConnectWalletVariables,
} from "../graphql/queries/__generated__/ConnectWallet";
import useAppState from "../hooks/useAppState";
import { selectCurrentUser, selectThemeStore } from "../mobx/selectors";
import { userService } from "../services/UserService";
import { commonStyles } from "../styles/commonStyles";
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
