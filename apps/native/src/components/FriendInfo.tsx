import * as Clipboard from "expo-clipboard";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { config } from "../config";
import Cryptogotchi from "@crypto-koi/common/lib/mobx/Cryptogotchi";
import ViewUtils from "../utils/ViewUtils";
import Clock from "./Clock";
import IconButton from "./IconButton";

interface Props {
    cryptogotchi: Cryptogotchi;
    clockId: string;
    textColor: string;
}

const style = StyleSheet.create({
    colorListing: {
        backgroundColor: "rgba(255,255,255,0.06)",
    },
    colorBorder: {
        borderColor: "white",
    },
});

const FriendInfo = observer((props: Props) => {
    const { cryptogotchi } = props;
    const tailwind = useTailwind();
    const s = useMemo(() => ({ color: props.textColor }), [props.textColor]);
    const uint = cryptogotchi.getUint256;

    const copyToTokenIdClipboard = () => {
        Clipboard.setString(uint);
        ViewUtils.toast("Copied");
    };

    const copyOwnerAddressToClipboard = () => {
        Clipboard.setString(cryptogotchi.ownerAddress);
        ViewUtils.toast("Copied");
    };

    const copySmartContractAddressToClipboard = () => {
        Clipboard.setString(config.contractAddress);
        ViewUtils.toast("Copied");
    };

    return (
        <View>
            <View style={tailwind("flex-row pb-4 justify-between")}>
                <View
                    style={[
                        tailwind(
                            "p-1 pt-2 flex-1 flex-col mr-1 items-center rounded-lg"
                        ),
                        style.colorListing,
                    ]}
                >
                    <View
                        style={[
                            tailwind("w-10 border-2 rounded-lg mb-1 h-10"),
                            {
                                backgroundColor:
                                    cryptogotchi.attributes.primaryColor,
                            },
                            style.colorBorder,
                        ]}
                    />
                    <Text style={tailwind("text-white text-xs")}>
                        {cryptogotchi.attributes.primaryColor}
                    </Text>
                </View>

                <View
                    style={[
                        tailwind(
                            "p-1 pt-2 flex-1 flex-col mr-1 items-center rounded-lg"
                        ),
                        style.colorListing,
                    ]}
                >
                    <View
                        style={[
                            tailwind("w-10 border-2 rounded-lg mb-1 h-10"),
                            {
                                backgroundColor:
                                    cryptogotchi.attributes.bodyColor,
                            },
                            style.colorBorder,
                        ]}
                    />
                    <Text style={tailwind("text-white text-xs text-center")}>
                        {cryptogotchi.attributes.bodyColor}
                    </Text>
                </View>

                <View
                    style={[
                        tailwind(
                            "p-1 pt-2 flex-1 flex-col mr-1 items-center rounded-lg"
                        ),
                        style.colorListing,
                    ]}
                >
                    <View
                        style={[
                            tailwind("w-10 border-2 rounded-lg mb-1 h-10"),
                            {
                                backgroundColor:
                                    cryptogotchi.attributes.finColor,
                            },
                            style.colorBorder,
                        ]}
                    />
                    <Text style={tailwind("text-white text-xs text-center")}>
                        {cryptogotchi.attributes.finColor}{" "}
                    </Text>
                </View>

                <View
                    style={[
                        tailwind(
                            "p-1 pt-2 flex-1 flex-col mr-1 items-center rounded-lg"
                        ),
                        style.colorListing,
                    ]}
                >
                    <View
                        style={[
                            tailwind(
                                "w-10 rounded-lg border-2 mb-1 flex-row items-center justify-center h-10"
                            ),
                            style.colorBorder,
                        ]}
                    >
                        <Text style={tailwind("font-bold text-lg text-white")}>
                            {cryptogotchi.attributes.patternQuantity}
                        </Text>
                    </View>
                    <Text style={tailwind("text-white text-xs text-center")}>
                        Patterns
                    </Text>
                </View>
            </View>
            <View style={tailwind("flex-row items-center")}>
                <Icon
                    style={[tailwind("text-2xl opacity-50"), s]}
                    name="information-outline"
                />
                <Text style={[tailwind("ml-2"), s]}>Age:</Text>
                {cryptogotchi.deathDate === null ? (
                    <Clock
                        id={props.clockId}
                        style={[tailwind("ml-2"), { color: props.textColor }]}
                        date={cryptogotchi.createdAt}
                    />
                ) : (
                    <Text style={[tailwind("ml-2"), s]}>
                        {cryptogotchi.deathDateString} (died:{" "}
                        {cryptogotchi.deathDate.format("DD.MM.YYYY HH:mm")})
                    </Text>
                )}
            </View>
            <View style={tailwind("flex-row items-center")}>
                <Icon
                    style={[tailwind("text-2xl opacity-50"), s]}
                    name={
                        cryptogotchi.isValidNft ? "shield-check" : "shield-off"
                    }
                />
                <Text style={[tailwind("ml-2 flex-1"), s]}>
                    #{uint.slice(0, 6)}...
                    {uint.slice(uint.length - 6, uint.length)}
                    {cryptogotchi.isValidNft ? " (is valid NFT)" : " (No NFT)"}
                </Text>
                <View>
                    <IconButton
                        onPress={copyToTokenIdClipboard}
                        color={props.textColor}
                        name="content-copy"
                    />
                </View>
            </View>

            {cryptogotchi.ownerAddress !== null && (
                <View style={tailwind("flex-row items-center")}>
                    <Icon
                        style={[tailwind("text-2xl opacity-50"), s]}
                        name="fishbowl"
                    />
                    <Text style={[tailwind("ml-2"), s]}>Owner: </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="middle"
                        style={[s, tailwind("flex-1")]}
                    >
                        {cryptogotchi.ownerAddress}
                    </Text>
                    <View>
                        <IconButton
                            onPress={copyOwnerAddressToClipboard}
                            color={props.textColor}
                            name="content-copy"
                        />
                    </View>
                </View>
            )}
            <View style={tailwind("flex-row items-center")}>
                <Icon
                    style={[tailwind("text-2xl opacity-50"), s]}
                    name="briefcase"
                />
                <Text style={[tailwind("ml-2"), s]}>Smart Contract: </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    style={[s, tailwind("flex-1")]}
                >
                    {config.contractAddress}
                </Text>
                <View>
                    <IconButton
                        onPress={copySmartContractAddressToClipboard}
                        color={props.textColor}
                        name="content-copy"
                    />
                </View>
            </View>
        </View>
    );
});

export default FriendInfo;
