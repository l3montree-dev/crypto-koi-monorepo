import { useMutation } from "@apollo/client";
import { FEED_CRYPTOGOTCHI_MUTATION } from "@crypto-koi/common/lib/graphql/queries/cryptogotchi";
import {
    Feed,
    FeedVariables,
} from "@crypto-koi/common/lib/graphql/queries/__generated__/Feed";
import Cryptogotchi from "@crypto-koi/common/lib/mobx/Cryptogotchi";
import User from "@crypto-koi/common/lib/mobx/User";

export function useFeedCryptogotchi(
    currentUser: User | null,
    cryptogotchi: Cryptogotchi
) {
    const currentUserIsOwner = currentUser?.id === cryptogotchi.ownerId;

    const [feed, { loading }] = useMutation<Feed, FeedVariables>(
        FEED_CRYPTOGOTCHI_MUTATION
    );

    const handleFeed = async () => {
        if (!currentUserIsOwner) {
            return;
        }
        try {
            const res = await feed({ variables: { id: cryptogotchi.id } });
            if (!res.data) {
                return;
            }

            cryptogotchi.setFromFragment(res.data.feed);
        } catch (e) {
            //
        }
    };

    return {
        handleFeed,
        loading,
    };
}
