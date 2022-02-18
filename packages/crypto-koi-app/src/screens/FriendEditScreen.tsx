/* eslint-disable react-native/no-raw-text */
import { useMutation, useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import React, { FunctionComponent, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { AppButton } from "../components/AppButton";
import FriendInfo from "../components/FriendInfo";
import Input from "../components/Input";
import Screen from "../components/Screen";
import {
    CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION,
    FETCH_EVENTS,
} from "../graphql/queries/cryptogotchi";
import {
    ChangeCryptogotchiName,
    ChangeCryptogotchiNameVariables,
} from "../graphql/queries/__generated__/ChangeCryptogotchiName";
import { ClientEvent } from "../graphql/queries/__generated__/ClientEvent";
import {
    FetchEvents,
    FetchEventsVariables,
} from "../graphql/queries/__generated__/FetchEvents";
import useAppState from "../hooks/useAppState";
import useInput from "../hooks/useInput";
import { selectFirstCryptogotchi, selectThemeStore } from "../mobx/selectors";
import log from "../utils/logger";

type Props = ClientEvent & { name: string; index: number };

const style = StyleSheet.create({
    circle: {
        borderColor: "rgba(255,255,255,0.3)",
    },
    border: {
        borderColor: "rgba(255,255,255,0.5)",

        borderLeftWidth: 1,
        position: "absolute",
        left: 36,
        top: 0,
        bottom: 0,
    },
    firstItem: {
        bottom: "50%",
    },
});
interface EventItemContainerProps {
    iconName: string;
    date: string | Moment;
    text: string;
    isFirst?: boolean;
}

const EventItemContainer: FunctionComponent<EventItemContainerProps> = observer(
    (props) => {
        const tailwind = useTailwind();
        const themeStore = useAppState(selectThemeStore);

        useEffect(() => {
            themeStore.setCurrentHeaderTintColor(themeStore.onSecondary);
        }, []);

        return (
            <View style={tailwind("pr-4 pl-3")}>
                <View
                    style={[style.border, props.isFirst && style.firstItem]}
                />
                <View style={tailwind("mb-4")}>
                    <View style={tailwind("flex-row items-center")}>
                        <View
                            style={[
                                tailwind("rounded-full p-1"),
                                { backgroundColor: themeStore.secondaryColor },
                            ]}
                        >
                            <View
                                style={[
                                    style.circle,
                                    tailwind(
                                        "border-2 mr-2 w-10 h-10 flex-row justify-center items-center rounded-full"
                                    ),
                                ]}
                            >
                                <Icon
                                    style={[
                                        { color: themeStore.onSecondary },
                                        tailwind("opacity-75 text-lg"),
                                    ]}
                                    name={props.iconName}
                                />
                            </View>
                        </View>
                        <View
                            style={[
                                { backgroundColor: themeStore.backgroundColor },
                                tailwind("flex-1 p-3 rounded-lg"),
                            ]}
                        >
                            <View style={tailwind("mb-3")}>
                                <Text
                                    style={{ color: themeStore.onBackground }}
                                >
                                    {props.text}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    { color: themeStore.onBackground },
                                    tailwind("text-right text-xs opacity-50"),
                                ]}
                            >
                                {moment(props.date).format(
                                    "DD.MM.YYYY HH:mm:ss"
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
);
const EventItem: FunctionComponent<Props> = (props) => {
    return (
        <Animated.View entering={FadeIn.delay((props.index % 20) * 100)}>
            <EventItemContainer
                date={props.createdAt}
                iconName="heart"
                text={
                    "You fed " + props.name + " with " + props.payload + " food"
                }
            />
        </Animated.View>
    );
};

const FriendEditModal = observer(() => {
    const cryptogotchi = useAppState(selectFirstCryptogotchi);
    const tailwind = useTailwind();
    const name = useInput(cryptogotchi?.name);
    const [changeName, { loading, error }] = useMutation<
        ChangeCryptogotchiName,
        ChangeCryptogotchiNameVariables
    >(CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION);

    const { fetchMore, data: events } = useQuery<
        FetchEvents,
        FetchEventsVariables
    >(FETCH_EVENTS, {
        variables: { id: cryptogotchi?.id ?? "", offset: 0, limit: 20 },
    });

    const themeStore = useAppState(selectThemeStore);

    const onNameSave = async () => {
        if (!cryptogotchi) {
            log.error("No cryptogotchi to save");
            return;
        }
        const result = await changeName({
            variables: { id: cryptogotchi.id, name: name.value },
        });
        cryptogotchi.setName(result.data?.changeCryptogotchiName.name);
    };

    if (!cryptogotchi) {
        return null;
    }

    return (
        <Screen
            style={[
                tailwind("flex-1"),
                { backgroundColor: themeStore.secondaryColor },
            ]}
        >
            <StatusBar style={themeStore.secondaryIsDark ? "light" : "dark"} />
            <View style={tailwind("flex-1")}>
                <FlatList
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (events) {
                            fetchMore({
                                variables: {
                                    offset: events?.events.length ?? 0,
                                },
                            });
                        }
                    }}
                    ListFooterComponent={
                        loading ? null : (
                            <EventItemContainer
                                date={cryptogotchi.createdAt || ""}
                                iconName="egg"
                                isFirst
                                text={cryptogotchi.name + " was born"}
                            />
                        )
                    }
                    ListHeaderComponent={
                        <View style={tailwind("px-4")}>
                            <View style={tailwind("rounded-lg mb-6")}>
                                <FriendInfo
                                    textColor={themeStore.onSecondary}
                                    clockId={"friend-edit"}
                                    cryptogotchi={cryptogotchi}
                                />
                            </View>
                            <Input
                                label="Change Name"
                                textColor={themeStore.buttonTextColor}
                                labelColor={themeStore.onSecondary}
                                style={[
                                    tailwind("mb-10"),
                                    {
                                        backgroundColor:
                                            themeStore.buttonBackgroundColor,
                                    },
                                ]}
                                {...name}
                                selectTextOnFocus
                            />
                            <View style={tailwind("mb-4")}>
                                <Text style={{ color: themeStore.onSecondary }}>
                                    Events
                                </Text>
                            </View>
                        </View>
                    }
                    data={events?.events || []}
                    renderItem={({ item, index }) => (
                        <EventItem
                            index={index}
                            name={cryptogotchi.name ?? ""}
                            key={item.id}
                            {...item}
                        />
                    )}
                />
            </View>
            <View
                style={[
                    tailwind("p-4 flex-row"),
                    { backgroundColor: themeStore.secondaryColor },
                ]}
            >
                <View style={tailwind("flex-1 mr-2")}>
                    <AppButton
                        backgroundColor={themeStore.buttonBackgroundColor}
                        textColor={themeStore.buttonTextColor}
                        disabled={!cryptogotchi.isAlive}
                        style={tailwind("w-full")}
                        title="Make NFT"
                    />
                </View>

                <View style={tailwind("flex-1 ml-2")}>
                    <AppButton
                        backgroundColor={themeStore.buttonBackgroundColor}
                        textColor={themeStore.buttonTextColor}
                        loading={loading && !error}
                        onPress={onNameSave}
                        disabled={!cryptogotchi.isAlive}
                        style={tailwind("w-full")}
                        title="Save"
                    />
                </View>
            </View>
        </Screen>
    );
});

export default FriendEditModal;
