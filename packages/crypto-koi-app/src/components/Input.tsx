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
            <View style={tailwind("text-white rounded-lg py-3")}>
                <Text style={tailwind("text-white opacity-75 mb-2")}>
                    {label}
                </Text>

                <View style={[tailwind("rounded-lg"), style]}>
                    <TextInput
                        ref={textInputRef}
                        style={tailwind(
                            "text-lg text-white py-2 px-3 w-full text-white"
                        )}
                        {...rest}
                    />
                </View>
            </View>
        </Pressable>
    );
}

export default Input;
