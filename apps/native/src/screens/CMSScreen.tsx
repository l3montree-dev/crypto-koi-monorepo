import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import Markdown from "react-native-markdown-renderer";
import { useTailwind } from "tailwind-rn";
import { config } from "../config";
import { RootStackParamList } from "../hooks/useNavigation";
import { CustomColors } from "../styles/colors";

const style = StyleSheet.create({
    content: {
        backgroundColor: CustomColors.bgDark,
    },
});

const CMSScreen = () => {
    const tailwind = useTailwind();
    const route = useRoute<RouteProp<RootStackParamList, "CMSScreen">>();

    const [markdown, setMarkdown] = useState("");
    useEffect(() => {
        (async function () {
            const response = await fetch(
                config.cmsBaseUrl +
                "/api/pages?filters[Link][$eq]=" +
                route.params.link +
                "&populate=deep"
            );
            const data = await response.json();
            setMarkdown(data.data[0].attributes["Pagebuilder"][0].Text);
        })();
    }, [route.params.link]);
    const headerHeight = useHeaderHeight();

    return (
        <View
            style={
                Platform.OS === "ios"
                    ? tailwind("flex-1")
                    : [{ paddingTop: headerHeight }, tailwind("flex-1")]
            }
        >
            <ScrollView
                contentContainerStyle={[tailwind("p-4"), style.content]}
            >
                <Markdown
                    style={{
                        text: { color: CustomColors.buttonTextColor },
                        heading1: tailwind("font-bold text-3xl"),
                        heading2: tailwind("font-bold text-2xl"),
                        heading3: tailwind("font-bold text-xl mt-5"),
                    }}
                >
                    {markdown}
                </Markdown>
            </ScrollView>
        </View>
    );
};

export default CMSScreen;
