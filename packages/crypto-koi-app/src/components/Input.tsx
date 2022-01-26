import React, { useRef } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

type Props = TextInputProps & {
    label: string;
};
function Input(props: Props) {
    const tailwind = useTailwind();
    const textInputRef = useRef<TextInput>(null);

    const { label, style, ...rest } = props;
    return (
        <Pressable onPress={() => textInputRef.current?.focus()}>
            <View style={[tailwind("text-white rounded-lg py-3 "), style]}>
                <Text style={tailwind("text-white opacity-75 px-3")}>
                    {label}
                </Text>

                <TextInput
                    ref={textInputRef}
                    style={tailwind(
                        "text-lg text-white py-1 px-3 w-full text-white rounded-lg"
                    )}
                    {...rest}
                />
            </View>
        </Pressable>
    );
}

export default Input;
