import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "./hooks/useNavigation";

const style = StyleSheet.create({
    container: {},
});

const HomeScreen = () => {
    const { navigate } = useNavigation();

    return (
        <View style={style.container}>
            <Button
                title="SnakeGame"
                onPress={() => navigate("SnakeGameScreen")}
            ></Button>
        </View>
    );
};

export default HomeScreen;
