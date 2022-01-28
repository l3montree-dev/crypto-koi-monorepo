import { ApolloError } from "@apollo/client";
import React, { FunctionComponent } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";

const style = StyleSheet.create({
    error: {
        fontSize: 60,
        lineHeight: 100,
    },
});
const Loading: FunctionComponent<{
    loading: boolean;
    error: ApolloError | undefined;
    errorMsg: string;
    emptyMsg: string;
}> = (props) => {
    const { loading, error, errorMsg, emptyMsg } = props;
    const tailwind = useTailwind();

    if (!loading && !error) {
        return null;
    }
    return (
        <View style={tailwind("px-4")}>
            {loading ? (
                <View style={tailwind("p-10")}>
                    <ActivityIndicator
                        color="rgba(255,255,255,0.5)"
                        size="large"
                    />
                </View>
            ) : error ? (
                <View>
                    <Icon
                        style={[
                            tailwind(
                                "text-white text-center opacity-50 text-4xl"
                            ),
                            style.error,
                        ]}
                        name="alert-circle-outline"
                    />
                    <Text
                        style={tailwind(
                            "text-white text-indigo-50 opacity-50 px-10 text-center"
                        )}
                    >
                        {errorMsg}
                    </Text>
                </View>
            ) : (
                <View>
                    <Icon
                        style={[
                            tailwind(
                                "text-white text-center opacity-50 text-4xl"
                            ),
                            style.error,
                        ]}
                        name="alert-circle-outline"
                    />
                    <Text
                        style={tailwind(
                            "text-white opacity-50 px-10 text-center"
                        )}
                    >
                        {emptyMsg}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Loading;
