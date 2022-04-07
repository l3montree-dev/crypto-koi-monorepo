import { useQuery } from "@apollo/client";
import { RouteProp, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { FIND_CRYPTOGOTCHI } from "@crypto-koi/common/lib/graphql/queries/cryptogotchi";
import { FindCryptogotchi } from "@crypto-koi/common/lib/graphql/queries/__generated__/FindCryptogotchi";
import { RootStackParamList } from "../hooks/useNavigation";
import Cryptogotchi from "@crypto-koi/common/lib/mobx/Cryptogotchi";
import CryptogotchiView from "../views/CryptogotchiView";

const CryptogotchiScreen = observer(() => {
    const {
        params: { cryptogotchiId },
    } = useRoute<RouteProp<RootStackParamList, "CryptogotchiScreen">>();
    const { data } = useQuery<FindCryptogotchi>(FIND_CRYPTOGOTCHI, {
        variables: { id: cryptogotchiId },
    });

    const cryptogotchi = useMemo(() => {
        if (data?.cryptogotchi) {
            return new Cryptogotchi(data.cryptogotchi);
        }
        return null;
    }, [data?.cryptogotchi]);

    if (!cryptogotchi) {
        return null;
    }

    return (
        <CryptogotchiView
            isVisible
            clockIdPrefix="cryptogotchi-screen"
            cryptogotchi={cryptogotchi}
        />
    );
});

export default CryptogotchiScreen;
