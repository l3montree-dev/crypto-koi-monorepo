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
            <View
                style={[
                    tailwind("bg-purple-500 text-white rounded-lg py-2 px-2"),
                    style,
                ]}
            >
                <Text style={tailwind("text-white opacity-75")}>{label}</Text>

                <TextInput
                    ref={textInputRef}
                    style={tailwind(
                        "bg-purple-500 text-lg text-white flex-1 w-full text-white rounded-lg"
                    )}
                    {...rest}
                />
            </View>
        </Pressable>
    );
}

export default Input;
