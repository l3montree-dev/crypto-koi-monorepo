import { Button } from '@chakra-ui/react'
import { ClientCryptogotchi } from '@crypto-koi/common/lib/graphql/queries/__generated__/ClientCryptogotchi'
import { useFeedCryptogotchi } from '../hooks/useFeedCryptogotchi'
import Cryptogotchi from '@crypto-koi/common/lib/mobx/Cryptogotchi'
import Transformer from '@crypto-koi/common/lib/Transformer'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import Image from 'next/image'
import { FunctionComponent, useContext, useMemo } from 'react'
import { BsFillShieldSlashFill, BsShieldFillCheck } from 'react-icons/bs'
import { MdInfoOutline } from 'react-icons/md'
import { config } from '../config'
import { AppStateContext } from '../hooks/AppStateContext'
import Clock from './Clock'
import { Attributes } from './KoiAttributes'
import Lifetime from './Lifetime'

export const CryptogotchiView: FunctionComponent<ClientCryptogotchi> = observer(
    (props) => {
        const { store } = useContext(AppStateContext)

        const cryptogotchi = useMemo(() => {
            // check if the cryptogotchi we are trying to render belongs to the current user.
            if (props.ownerId === store.authStore?.currentUser?.id) {
                // it does indeed belong to the current user
                // we need to return a reference to the one stored inside the auth store.
                return (
                    store.authStore.currentUser.cryptogotchies.find(
                        (c) => c.id === props.id
                    ) ??
                    // just instruct a new one, if we cannot find it.
                    // this is just error handling
                    new Cryptogotchi(props)
                )
            } else {
                return new Cryptogotchi(props)
            }
        }, [
            props,
            store.authStore.currentUser?.cryptogotchies,
            store.authStore.currentUser?.id,
        ])

        const { handleFeed, loading } = useFeedCryptogotchi(
            store.authStore.currentUser,
            cryptogotchi
        )

        return (
            <div>
                <div className="text-white flex flex-row justify-center rounded-lg">
                    <div className="relative pt-2">
                        <Lifetime {...props} />
                        <Image
                            width={500}
                            height={500}
                            quality={100}
                            alt={cryptogotchi.name ?? 'CryptoKoi'}
                            src={
                                config.api +
                                '/images/' +
                                Transformer.uuidToUint256(cryptogotchi.id) +
                                '?size=1024'
                            }
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="font-bold mb-2 text-white text-2xl font-poppins">
                        {cryptogotchi.name}
                    </h2>
                    <div>
                        {cryptogotchi.isValidNft ? (
                            <div className="opacity-75 flex-row items-center flex text-white">
                                <BsShieldFillCheck />
                                <span className="ml-2">Valid NFT</span>
                            </div>
                        ) : (
                            <div className="opacity-75 flex-row items-center flex text-white">
                                <BsFillShieldSlashFill />
                                <span className="ml-2">No NFT</span>
                            </div>
                        )}
                        <div className="flex flex-row text-white opacity-75 items-center mt-2">
                            <MdInfoOutline />
                            <div className="ml-2">
                                Age:{' '}
                                <Clock
                                    runTill={moment().add(
                                        props.minutesTillDeath,
                                        'minutes'
                                    )}
                                    id={props.id + '-age'}
                                    date={moment(props.createdAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="font-bold text-white mb-5 text-2xl font-poppins">
                        Attributes
                    </h2>
                    <Attributes {...cryptogotchi.attributes} />
                </div>
                {store.authStore.currentUser?.id === cryptogotchi.ownerId && (
                    <div className="mt-5">
                        <Button
                            isLoading={loading}
                            onClick={handleFeed}
                            colorScheme={'cherry'}
                        >
                            Feed
                        </Button>
                    </div>
                )}
            </div>
        )
    }
)
