import React, { FunctionComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

const style = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
});
const Screen: FunctionComponent<{ style: ViewStyle }> = (props) => {
    return <View style={[style.container, props.style]}>{props.children}</View>;
};

export default Screen;
