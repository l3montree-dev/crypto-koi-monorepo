import React, { FunctionComponent } from "react";
import { Platform, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const style = StyleSheet.create({
    container: {
        marginTop: Platform.select({ android: 96 }),
    },
});
const Screen: FunctionComponent<{ style: ViewStyle }> = (props) => {
    return (
        <SafeAreaView style={[style.container, props.style]}>
            {props.children}
        </SafeAreaView>
    );
};

export default Screen;
