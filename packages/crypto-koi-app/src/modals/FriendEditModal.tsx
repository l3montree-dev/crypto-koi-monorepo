import { useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React from "react";
import { Modal, ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { AppButton } from "../components/AppButton";
import FriendInfo from "../components/FriendInfo";
import FriendTitle from "../components/FriendTitle";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import { CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION } from "../graphql/queries/cryptogotchiMutations";
import {
    ChangeCryptogotchiName,
    ChangeCryptogotchiNameVariables,
} from "../graphql/queries/__generated__/ChangeCryptogotchiName";
import useInput from "../hooks/useInput";
import Cryptogotchi from "../mobx/Cryptogotchi";
import { Colors } from "../styles/colors";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    cryptogotchi: Cryptogotchi;
}
const FriendEditModal = observer((props: Props) => {
    const { isOpen, onClose, cryptogotchi } = props;
    const tailwind = useTailwind();
    const name = useInput(cryptogotchi.name);
    const [changeName, { loading, error }] = useMutation<
        ChangeCryptogotchiName,
        ChangeCryptogotchiNameVariables
    >(CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION);

    const onNameSave = async () => {
        const result = await changeName({
            variables: { id: cryptogotchi.id, name: name.value },
        });
        cryptogotchi.setName(result.data?.changeCryptogotchiName.name);
    };

    return (
        <Modal animationType="slide" visible={isOpen} onRequestClose={onClose}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.bgColorVariant}
            />
            <View style={tailwind("flex-1 bg-violet-900")}>
                <ScrollView
                    contentContainerStyle={tailwind("px-4")}
                    style={tailwind("flex-1")}
                >
                    <View style={tailwind("flex-row my-1 justify-center")}>
                        <View style={tailwind("absolute left-0")}>
                            <IconButton onPress={onClose} name="arrow-left" />
                        </View>
                        <View style={tailwind("my-3")}>
                            <FriendTitle cryptogotchi={cryptogotchi} />
                        </View>
                    </View>
                    <View style={tailwind("rounded-lg mt-4 mb-6")}>
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
            </View>
        </Modal>
    );
});

export default FriendEditModal;
