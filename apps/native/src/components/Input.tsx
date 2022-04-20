import React, { useRef } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

type Props = TextInputProps & {
    label?: string;
    textColor: string;
    labelColor: string;
};
const Input = (props: Props) => {
    const tailwind = useTailwind();
    const textInputRef = useRef<TextInput>(null);

    const { label, style, ...rest } = props;
    return (
        <Pressable onPress={() => textInputRef.current?.focus()}>
            <View style={tailwind("rounded-lg")}>
                {props.label !== undefined && (
                    <Text
                        style={[tailwind("mb-2"), { color: props.labelColor }]}
                    >
                        {label}
                    </Text>
                )}
                <View style={[tailwind("rounded-lg"), style]}>
                    <TextInput
                        ref={textInputRef}
                        style={[
                            tailwind("text-lg py-2 px-3 w-full"),
                            { color: props.textColor },
                        ]}
                        {...rest}
                    />
                </View>
            </View>
        </Pressable>
    );
};

export default Input;
