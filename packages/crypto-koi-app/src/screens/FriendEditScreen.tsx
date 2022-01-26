import { useMutation } from "@apollo/client";
import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { AppButton } from "../components/AppButton";
import FriendInfo from "../components/FriendInfo";
import FriendTitle from "../components/FriendTitle";
import Input from "../components/Input";
import Screen from "../components/Screen";
import { CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION } from "../graphql/queries/cryptogotchiMutations";
import {
    ChangeCryptogotchiName,
    ChangeCryptogotchiNameVariables,
} from "../graphql/queries/__generated__/ChangeCryptogotchiName";
import useAppState from "../hooks/useAppState";
import useInput from "../hooks/useInput";
import { selectFirstCryptogotchi } from "../mobx/selectors";
import log from "../utils/logger";

const FriendEditModal = observer(() => {
    const cryptogotchi = useAppState(selectFirstCryptogotchi);
    const tailwind = useTailwind();
    const name = useInput(cryptogotchi?.name);
    const [changeName, { loading, error }] = useMutation<
        ChangeCryptogotchiName,
        ChangeCryptogotchiNameVariables
    >(CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION);

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
            <ScrollView
                contentContainerStyle={tailwind("px-4")}
                style={tailwind("flex-1")}
            >
                <View style={tailwind("rounded-lg mb-6")}>
                    <FriendInfo cryptogotchi={cryptogotchi} />
                </View>
                <Input
                    label="Change Name"
                    style={tailwind("bg-violet-500")}
                    {...name}
                    selectTextOnFocus
                />
            </ScrollView>
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
