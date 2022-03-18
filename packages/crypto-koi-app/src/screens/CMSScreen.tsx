import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { RootStackParamList } from "../hooks/useNavigation";

const CMSScreen = () => {
    const tailwind = useTailwind();
    const route = useRoute<RouteProp<RootStackParamList, "CMSScreen">>();
    return (
        <View style={tailwind("flex-1")}>
            <Text>{route.params.link}</Text>
        </View>
    );
};

export default CMSScreen;
