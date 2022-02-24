import * as Clipboard from "expo-clipboard";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import Cryptogotchi from "../mobx/Cryptogotchi";
import Clock from "./Clock";
import IconButton from "./IconButton";

interface Props {
    cryptogotchi: Cryptogotchi;
    clockId: string;
    textColor: string;
}

const FriendInfo = observer((props: Props) => {
    const { cryptogotchi } = props;
    const tailwind = useTailwind();
    const s = useMemo(() => ({ color: props.textColor }), [props.textColor]);
    const uint = cryptogotchi.getUint256;

    const copyToClipboard = () => {
        Clipboard.setString(uint);
    };
    return (
        <View>
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
                        onPress={copyToClipboard}
                        color={props.textColor}
                        name="content-copy"
                    />
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
        </View>
    );
});

export default FriendInfo;
