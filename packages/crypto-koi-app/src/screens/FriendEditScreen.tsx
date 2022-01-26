/* eslint-disable react-native/no-raw-text */
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { FlatList, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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
import { selectFirstCryptogotchi } from "../mobx/selectors";
import log from "../utils/logger";

type Props = ClientEvent & { name: string };

const style = StyleSheet.create({
    error: {
        fontSize: 60,
        lineHeight: 100,
    },
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

const EventItemContainer: FunctionComponent<EventItemContainerProps> = (
    props
) => {
    const tailwind = useTailwind();
    return (
        <View style={tailwind("pr-4 pl-3")}>
            <View style={[style.border, props.isFirst && style.firstItem]} />
            <View style={tailwind("mb-4")}>
                <View style={tailwind("flex-row items-center")}>
                    <View style={tailwind("bg-violet-900 rounded-full p-1")}>
                        <View
                            style={[
                                style.circle,
                                tailwind(
                                    "border-2 mr-2 w-10 h-10 flex-row justify-center items-center rounded-full"
                                ),
                            ]}
                        >
                            <Icon
                                style={tailwind(
                                    "text-white opacity-50 text-lg"
                                )}
                                name={props.iconName}
                            />
                        </View>
                    </View>
                    <View
                        style={tailwind("bg-violet-800 flex-1 p-3 rounded-lg")}
                    >
                        <View style={tailwind("mb-3")}>
                            <Text style={tailwind("text-white")}>
                                {props.text}
                            </Text>
                        </View>

                        <Text
                            style={tailwind(
                                "text-white text-right text-xs opacity-50"
                            )}
                        >
                            {moment(props.date).format("DD.MM.YYYY HH:mm:ss")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const EventItem: FunctionComponent<Props> = (props) => {
    return (
        <EventItemContainer
            date={props.createdAt}
            iconName="heart"
            text={"You fed " + props.name + " with " + props.payload + " food"}
        />
    );
};

const EventEmpty: FunctionComponent<{
    loading: boolean;
    error: ApolloError | undefined;
}> = (props) => {
    const { loading } = props;
    const tailwind = useTailwind();
    return (
        <View style={tailwind("px-4")}>
            {loading ? (
                <View style={tailwind("p-10")}>
                    <ActivityIndicator
                        color="rgba(255,255,255,0.5)"
                        size="large"
                    />
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
                        Could not load events. Please try again later.
                    </Text>
                </View>
            )}
        </View>
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

    const {
        fetchMore,
        data: events,
        loading: eventsLoading,
        error: eventsError,
    } = useQuery<FetchEvents, FetchEventsVariables>(FETCH_EVENTS, {
        variables: { id: cryptogotchi?.id ?? "", offset: 0, limit: 20 },
    });

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
        <Screen style={tailwind("flex-1 bg-violet-900")}>
            <View style={tailwind("flex-1")}>
                <FlatList
                    onEndReachedThreshold={0.5}
                    onEndReached={() =>
                        fetchMore({
                            variables: { offset: events?.events.length ?? 0 },
                        })
                    }
                    ListEmptyComponent={
                        <EventEmpty
                            loading={eventsLoading}
                            error={eventsError}
                        />
                    }
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
                                <FriendInfo cryptogotchi={cryptogotchi} />
                            </View>
                            <Input
                                label="Change Name"
                                style={tailwind("bg-violet-500 mb-10")}
                                {...name}
                                selectTextOnFocus
                            />
                            <View style={tailwind("mb-4")}>
                                <Text style={tailwind("text-white")}>
                                    Events
                                </Text>
                            </View>
                        </View>
                    }
                    data={events?.events || []}
                    renderItem={({ item }) => (
                        <EventItem
                            name={cryptogotchi.name ?? ""}
                            key={item.id}
                            {...item}
                        />
                    )}
                />
            </View>
            <View style={tailwind("p-4 flex-row bg-violet-900")}>
                <View style={tailwind("flex-1 mr-2")}>
                    <AppButton
                        disabled={!cryptogotchi.isAlive}
                        style={tailwind("w-full")}
                        title="Make NFT"
                    />
                </View>

                <View style={tailwind("flex-1 ml-2")}>
                    <AppButton
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
