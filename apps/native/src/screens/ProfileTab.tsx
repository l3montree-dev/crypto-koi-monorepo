import { useMutation } from "@apollo/client";
import { CONNECT_WALLET_MUTATION } from "@crypto-koi/common/lib/graphql/queries/user";
import {
    ConnectWallet,
    ConnectWalletVariables,
} from "@crypto-koi/common/lib/graphql/queries/__generated__/ConnectWallet";
import { selectCurrentUser } from "@crypto-koi/common/lib/mobx/selectors";
import { hexChainId2Number } from "@crypto-koi/common/lib/web3";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { observer } from "mobx-react-lite";
import React from "react";
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { config } from "../config";
import useAppState from "../hooks/useAppState";
import { useNavigation } from "../hooks/useNavigation";
import { nativeRootStore } from "../mobx/NativeRootStore";
import { nativeUserService } from "../services/NativeUserService";
import { CustomColors } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import ViewUtils from "../utils/ViewUtils";

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
    const user = useAppState(selectCurrentUser);
    const tailwind = useTailwind();

    const connector = useWalletConnect();

    const [connectWallet, { loading }] = useMutation<
        ConnectWallet,
        ConnectWalletVariables
    >(CONNECT_WALLET_MUTATION);

    const handleLogout = () => {
        nativeUserService.logout();
        nativeRootStore.authStore.setCurrentUser(null);
    };

    const handleConnectWallet = async () => {
        const provider = new WalletConnectProvider({
            rpc: {
                [hexChainId2Number(config.chain.chainId)]: config.chain
                    .rpcUrls[0],
            },
            chainId: hexChainId2Number(config.chain.chainId),
            connector: connector,
            qrcode: false,
        });

        await provider.enable();

        try {
            await connectWallet({
                variables: { walletAddress: provider.accounts[0] },
            });
            nativeRootStore.authStore.setWalletAddress(provider.accounts[0]);
            ViewUtils.toast("Wallet successfully connected");
        } catch (e) {
            ViewUtils.toast(
                "Error connecting wallet - Is this wallet already used by another account? " +
                    provider.accounts[0]
            );
        }
    };

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
                        await nativeUserService.deleteAccount();
                        nativeRootStore.authStore.setCurrentUser(null);
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
                { backgroundColor: CustomColors.bgDark },
            ]}
        >
            <View
                style={[
                    tailwind("px-4 mt-3 pb-3"),
                    style.header,
                    { backgroundColor: CustomColors.bgDark },
                ]}
            >
                <Text
                    style={[
                        commonStyles.screenTitle,
                        tailwind("pt-1"),
                        { color: CustomColors.buttonTextColor },
                    ]}
                >
                    Profile
                </Text>
            </View>
            <View style={tailwind("mx-4 mt-5")}>
                <View style={tailwind("mb-5")}>
                    {user?.walletAddress ? (
                        <View style={tailwind("mb-5")}>
                            <Text style={tailwind("mb-2 text-white")}>
                                Connected Wallet
                            </Text>
                            <View
                                style={[
                                    tailwind(
                                        "flex-row items-center p-4 rounded-lg"
                                    ),
                                    {
                                        backgroundColor:
                                            CustomColors.buttonBackgroundColor,
                                    },
                                ]}
                            >
                                <Icon
                                    size={24}
                                    style={tailwind(
                                        "opacity-75 text-white mr-2"
                                    )}
                                    color={CustomColors.buttonTextColor}
                                    name="wallet"
                                />

                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="middle"
                                    style={tailwind("flex-1 text-white")}
                                >
                                    {user?.walletAddress}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={tailwind("mb-2 text-white")}>
                                Your CryptoKoi is currently not connected to any
                                wallet. If you uninstall the App, it will be
                                lost.
                            </Text>
                            <AppButton
                                loading={loading}
                                title="Connect Wallet"
                                onPress={handleConnectWallet}
                                textColor={CustomColors.buttonTextColor}
                                backgroundColor={
                                    CustomColors.buttonBackgroundColor
                                }
                            />
                        </View>
                    )}
                </View>
                <View
                    style={[
                        tailwind("mb-4 rounded-lg bg-white"),
                        { backgroundColor: CustomColors.buttonBackgroundColor },
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
                            <Text style={tailwind("text-white")}>Imprint</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() =>
                            Linking.openURL(config.privacyPolicyLink)
                        }
                    >
                        <View style={[tailwind("p-4"), style.listItem]}>
                            <Text style={tailwind("text-white")}>
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
                            <Text style={tailwind("text-white")}>
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
                            <Text
                                style={{ color: CustomColors.buttonTextColor }}
                            >
                                Open-Source Licenses
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={handleDeleteAccount}>
                        <View style={tailwind("p-4 flex-row items-center")}>
                            <Icon
                                size={24}
                                style={tailwind("mr-2 opacity-75 text-white")}
                                name="delete-outline"
                            />
                            <Text style={tailwind("text-white")}>
                                Delete account
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <AppButton
                    title="Logout"
                    onPress={handleLogout}
                    textColor={CustomColors.buttonTextColor}
                    backgroundColor={CustomColors.buttonBackgroundColor}
                />
            </View>
        </SafeAreaView>
    );
});
