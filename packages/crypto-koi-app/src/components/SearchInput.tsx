import React, { useRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";

type Props = TextInputProps & { onClose: () => void };
function SearchInput(props: Props) {
    const tailwind = useTailwind();
    const textInputRef = useRef<TextInput>(null);

    const { style, ...rest } = props;
    return (
        <View style={tailwind("text-white rounded-lg")}>
            <View style={[tailwind("rounded-lg items-center flex-row"), style]}>
                <Icon
                    style={tailwind("text-2xl ml-2 opacity-50")}
                    name="magnify"
                />
                <TextInput
                    ref={textInputRef}
                    returnKeyType="search"
                    style={tailwind(
                        "text-lg  py-2 px-2 flex-1 rounded-lg text-black"
                    )}
                    {...rest}
                />
                <Icon
                    onPress={props.onClose}
                    style={tailwind("text-2xl mr-2")}
                    name="close"
                />
            </View>
        </View>
    );
}

export default SearchInput;
