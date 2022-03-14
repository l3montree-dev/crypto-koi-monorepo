import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import Cryptogotchi from "../mobx/Cryptogotchi";

interface Props {
    cryptogotchi: Cryptogotchi;
    textColor: string;
}
const FriendTitle = observer((props: Props) => {
    const { cryptogotchi } = props;
    const tailwind = useTailwind();
    return (
        <View style={tailwind("flex-row flex-1")}>
            <Text
                style={[
                    tailwind("text-3xl flex-1 font-bold text-white"),
                    { color: props.textColor },
                ]}
            >
                {cryptogotchi.name}
                {!cryptogotchi?.isAlive && (
                    <Icon
                        name="grave-stone"
                        style={tailwind("text-3xl text-white opacity-50 ml-2")}
                    />
                )}
            </Text>
        </View>
    );
});

export default FriendTitle;
