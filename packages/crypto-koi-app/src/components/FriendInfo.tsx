import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTailwind } from "tailwind-rn/dist";
import Cryptogotchi from "../mobx/Cryptogotchi";
import Clock from "./Clock";

interface Props {
    cryptogotchi: Cryptogotchi;
    clockId: string;
}

const FriendInfo = observer((props: Props) => {
    const { cryptogotchi } = props;
    const tailwind = useTailwind();
    return (
        <View>
            <View style={tailwind("flex-row items-center")}>
                <Icon
                    style={
                        cryptogotchi.id
                            ? tailwind("text-2xl text-amber-500")
                            : tailwind("text-2xl text-white opacity-50")
                    }
                    name={cryptogotchi.id ? "shield-check" : "shield-off"}
                />
                <Text style={tailwind("text-white ml-2")}>
                    #
                    {cryptogotchi.id !== null
                        ? cryptogotchi.id + " (is valid NFT)"
                        : cryptogotchi.getBase64Uuid + " (No NFT)"}
                </Text>
            </View>
            <View style={tailwind("flex-row items-center")}>
                <Icon
                    style={tailwind("text-2xl text-amber-500")}
                    name="information-outline"
                />
                <Text style={tailwind("text-white ml-2")}>Age:</Text>
                {cryptogotchi.deathDate === null ? (
                    <Clock
                        id={props.clockId}
                        style={tailwind("text-white ml-2")}
                        date={cryptogotchi.createdAt}
                    />
                ) : (
                    <Text style={tailwind("text-white ml-2")}>
                        {cryptogotchi.deathDateString} (died:{" "}
                        {cryptogotchi.deathDate.format("DD.MM.YYYY HH:mm")})
                    </Text>
                )}
            </View>
        </View>
    );
});

export default FriendInfo;
