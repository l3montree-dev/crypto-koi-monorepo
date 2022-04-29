import { useMutation } from '@apollo/client'
import { Button, IconButton, useToast } from '@chakra-ui/react'
import {
    CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION,
    GET_NFT_SIGNATURE,
} from '@crypto-koi/common/lib/graphql/queries/cryptogotchi'
import {
    ChangeCryptogotchiName,
    ChangeCryptogotchiNameVariables,
} from '@crypto-koi/common/lib/graphql/queries/__generated__/ChangeCryptogotchiName'
import {
    GetNftSignature,
    GetNftSignatureVariables,
} from '@crypto-koi/common/lib/graphql/queries/__generated__/GetNftSignature'
import { GetUser_user } from '@crypto-koi/common/lib/graphql/queries/__generated__/GetUser'
import Cryptogotchi from '@crypto-koi/common/lib/mobx/Cryptogotchi'
import Transformer from '@crypto-koi/common/lib/Transformer'
import copyToClipboard from 'copy-to-clipboard'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent, useContext, useState } from 'react'
import {
    BsFillShieldSlashFill,
    BsFillTrophyFill,
    BsShieldFillCheck,
} from 'react-icons/bs'
import {
    MdEdit,
    MdFileDownload,
    MdInfoOutline,
    MdOutlineContentCopy,
} from 'react-icons/md'
import { config } from '../config'
import { AppStateContext } from '../hooks/AppStateContext'
import { useFeedCryptogotchi } from '../hooks/useFeedCryptogotchi'
import { makeNft } from '../web3'
import Clock from './Clock'
import CryptModal from './CryptModal'
import FeedButton from './FeedButton'
import { Attributes } from './KoiAttributes'
import Lifetime from './Lifetime'
import Toast from './Toast'

export const CryptogotchiView: FunctionComponent<{
    owner: GetUser_user
    cryptogotchi: Cryptogotchi
}> = observer((props) => {
    const { store, services } = useContext(AppStateContext)
    const toast = useToast()
    const { cryptogotchi } = props

    const [isOpen, setIsOpen] = useState(false)
    const [nftLoading, setNftLoading] = useState(false)

    const { handleFeed, loading } = useFeedCryptogotchi(
        store.authStore.currentUser,
        cryptogotchi
    )

    const [changeName, { loading: changeNameLoading }] = useMutation<
        ChangeCryptogotchiName,
        ChangeCryptogotchiNameVariables
    >(CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION)

    const [getNftSignature] = useMutation<
        GetNftSignature,
        GetNftSignatureVariables
    >(GET_NFT_SIGNATURE)

    const handleMakeNft = async () => {
        setNftLoading(true)
        try {
            await makeNft(async (userAddress: string) => {
                const res = await getNftSignature({
                    variables: {
                        address: userAddress.toLowerCase(),
                        id: cryptogotchi.id,
                    },
                })
                return res.data!.getNftSignature
            })
            // resync the user.
            store.authStore.setCurrentUser(await services.userService.sync())
        } catch (e) {
            console.error(e)
            toast({
                title: 'An error occured!',
                render: () => {
                    return (
                        <Toast msg="An error occured. Are you sure you have enough funds?" />
                    )
                },
            })
        } finally {
            setNftLoading(false)
        }
    }

    const handleNameSave = async (newName: string) => {
        if (!cryptogotchi) {
            return
        }
        const result = await changeName({
            variables: { id: cryptogotchi.id, name: newName.trim() },
        })

        cryptogotchi.setName(result.data?.changeCryptogotchiName.name)
        setIsOpen(false)
    }

    return (
        <>
            <CryptModal
                isOpen={isOpen}
                initialValue={cryptogotchi.name ?? ''}
                nameSaveLoading={changeNameLoading}
                onClose={() => setIsOpen(false)}
                onNameSave={handleNameSave}
                nameSaveDisabled={!cryptogotchi.isAlive}
                cryptogotchiId={cryptogotchi.id}
            />
            <div className="md:flex flex-row">
                <div className="text-white flex-1 md:mr-5 relative flex py-14 shadow-lg flex-row justify-center koi-gradient rounded-lg">
                    <div className="relative flex-row flex justify-center">
                        <div className="absolute">
                            <Lifetime
                                id={cryptogotchi.id + '-lifetime'}
                                maxLifetimeMinutes={
                                    cryptogotchi.maxLifetimeMinutes
                                }
                                minutesTillDeath={cryptogotchi.minutesTillDeath}
                            />
                        </div>
                        <Image
                            width={500}
                            className="floating"
                            height={500}
                            quality={100}
                            alt={cryptogotchi.name ?? 'CryptoKoi'}
                            src={
                                config.api +
                                '/images/' +
                                cryptogotchi.getUint256 +
                                '?size=1024'
                            }
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 ml-5 mb-5">
                        <a
                            target={'_blank'}
                            href={
                                config.api +
                                '/images/' +
                                cryptogotchi.getUint256 +
                                '?size=2048'
                            }
                            rel="noreferrer"
                        >
                            <IconButton
                                colorScheme={'white'}
                                variant={'outline'}
                                icon={<MdFileDownload />}
                                aria-label="Download Image"
                            />
                        </a>
                        {cryptogotchi.isValidNft && (
                            <a
                                target={'_blank'}
                                rel="noreferrer"
                                href={
                                    config.openseaUrl +
                                    '/assets/matic/' +
                                    config.contractAddress +
                                    '/' +
                                    cryptogotchi.getUint256
                                }
                            >
                                <Button
                                    variant={'outline'}
                                    colorScheme="white"
                                    className="ml-2"
                                    leftIcon={
                                        <Image
                                            alt="Opensea logo"
                                            src="/assets/opensea-black.svg"
                                            width={24}
                                            height={24}
                                        />
                                    }
                                >
                                    Visit on opensea.io
                                </Button>
                            </a>
                        )}
                    </div>
                    <span className="absolute top-0 p-5 text-xs right-0 z-1">
                        <span>Artwork by: </span>
                        <a
                            className="text-cherry"
                            href="https://www.instagram.com/tamxily.tattoo/"
                            rel="noreferrer"
                            target={'_blank'}
                        >
                            @tamxily.tattoo
                        </a>
                    </span>
                </div>

                <div className="mt-10 md:ml-5 flex-1 mx-auto">
                    <div>
                        <div className="mb-5 flex-1 w-full">
                            <p className="mb-0 pb-0">
                                <Link href={'/users/' + props.owner.id}>
                                    <a className="text-cherry">
                                        {props.owner.name}
                                    </a>
                                </Link>
                            </p>
                            <div className="flex justify-between items-center flex-row">
                                <h2 className="font-bold mb-0 flex-1 overflow-hidden text-2xl font-poppins">
                                    {cryptogotchi.name}
                                </h2>
                                <div>
                                    <Button
                                        onClick={() => setIsOpen(true)}
                                        color={'black'}
                                        colorScheme="black"
                                        leftIcon={<MdEdit />}
                                        aria-label="Edit Name"
                                    >
                                        Edit
                                    </Button>{' '}
                                </div>
                            </div>
                            <div className="flex flex-row items-center">
                                <span className="mr-2 text-ellipsis whitespace-nowrap flex-1 overflow-hidden">
                                    #{cryptogotchi.getUint256}
                                </span>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        copyToClipboard(cryptogotchi.getUint256)
                                        toast({
                                            title: 'Copied!',
                                            render: () => {
                                                return <Toast msg="Copied!" />
                                            },
                                        })
                                    }}
                                    leftIcon={<MdOutlineContentCopy />}
                                >
                                    Copy
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center">
                            {cryptogotchi.isValidNft ? (
                                <div className="flex-row items-center flex mr-4 bg-white px-3 py-1 rounded-full mb-5">
                                    <BsShieldFillCheck size={20} />
                                    <span className="ml-2">Valid NFT</span>
                                </div>
                            ) : (
                                <div className="flex-row items-center flex mr-4 bg-white px-3 py-1 rounded-full mb-5">
                                    <BsFillShieldSlashFill size={20} />
                                    <span className="ml-2">No NFT</span>
                                </div>
                            )}
                            <div className="flex flex-row items-center mr-4 bg-white px-3 py-1 rounded-full mb-5">
                                <MdInfoOutline size={20} />
                                <div className="ml-2">
                                    Age:{' '}
                                    <Clock
                                        runTill={moment().add(
                                            cryptogotchi.minutesTillDeath,
                                            'minutes'
                                        )}
                                        id={cryptogotchi.id + '-age'}
                                        date={moment(cryptogotchi.createdAt)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row items-center mb-4 bg-white px-3 py-1 rounded-full mr-5">
                                <BsFillTrophyFill />
                                <div className="ml-2">
                                    Rank:{' '}
                                    {cryptogotchi.isAlive ? (
                                        cryptogotchi.rank
                                    ) : (
                                        <span>dead</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-5">
                            <h2 className="font-bold mb-5 text-2xl font-poppins">
                                Attributes
                            </h2>
                            <Attributes {...cryptogotchi.attributes} />
                        </div>
                        {store.authStore.currentUser?.id ===
                            cryptogotchi.ownerId && (
                            <div className="bg-black flex-row flex md:bg-transparent px-3 py-3 fixed md:static bottom-0 z-10 left-0 right-0 md:px-0 md:mt-5">
                                <div
                                    className={
                                        'flex-1 h-12 ' +
                                        (!cryptogotchi.isValidNft ? 'mr-1' : '')
                                    }
                                >
                                    <FeedButton
                                        disabled={!cryptogotchi.isAlive}
                                        cryptogotchi={cryptogotchi}
                                        loading={loading}
                                        onClick={handleFeed}
                                    />
                                </div>
                                {!cryptogotchi.isValidNft && (
                                    <div className="flex-1 h-12 ml-1">
                                        <Button
                                            onClick={handleMakeNft}
                                            disabled={!cryptogotchi.isAlive}
                                            isLoading={nftLoading}
                                            colorScheme={'cherry'}
                                            isFullWidth
                                            height={'100%'}
                                        >
                                            Make NFT
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
})
