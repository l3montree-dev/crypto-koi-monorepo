import { Button } from '@chakra-ui/react'
import { ClientCryptogotchi } from '@crypto-koi/common/lib/graphql/queries/__generated__/ClientCryptogotchi'
import moment from 'moment'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { IGetYourKoiPB, IKoiMetadata } from '../cms/page'
import { CMSContent } from '../components/CMSContent'
import Koi from '../components/Koi'
import Section from '../components/Section'
import { config } from '../config'

const fetchRandomKoi = async (): Promise<IKoiMetadata> => {
    const resp = await fetch(
        config.api +
            '/v1/fakes/' +
            Math.random().toString().substring(2, 8) +
            Math.random().toString().substring(2, 8)
    )
    return resp.json()
}

function getAttribute<T>(koi: IKoiMetadata, name: string, d: T): T {
    return (
        (koi.attributes.find((a) => a.trait_type === name)?.value as
            | T
            | undefined) ?? d
    )
}

const GetYourKoi: FunctionComponent<IGetYourKoiPB> = (props) => {
    const [kois, setKois] = useState<Array<ClientCryptogotchi>>([])

    const regenerate = useCallback(async () => {
        const amountOfKois = window.innerWidth > 992 ? 3 : 1
        const promises = []
        for (let i = 0; i < amountOfKois; i++) {
            promises.push(fetchRandomKoi())
        }
        const data = await Promise.all(promises)

        const arr = data.map((koi) => ({
            __typename: 'Cryptogotchi' as const,
            id: (+(koi.image.split('/').pop() as string)).toString(16),
            isAlive: true,
            minutesTillDeath: moment().endOf('hour').diff(moment(), 'minute'),
            maxLifetimeMinutes: 60,
            food: 0,
            nextFeeding: 0,
            ownerAddress: '',
            rank: -1,
            color: '',
            isValidNft: false,
            deathDate: null,
            ownerId: '',
            createdAt: moment().startOf('hour'),
            attributes: {
                finColor: getAttribute(koi, 'Fin Color', ''),
                bodyColor: getAttribute(koi, 'Body Color', ''),
                patternQuantity: +getAttribute(koi, 'Pattern Quantity', '0'),
                __typename: 'CryptogotchiAttributes' as const,
                primaryColor: getAttribute(koi, 'Primary Color', ''),
                species: getAttribute(koi, 'Species', ''),
                birthday: moment().startOf('hour').unix(),
            },
            snapshotValid: true,
            name: getAttribute(koi, 'Species', ''),
        }))

        setKois(arr)
    }, [])

    useEffect(() => {
        regenerate()
    }, [regenerate])

    return (
        <Section className="bg-slate-200">
            <div className="px-4 max-w-screen-xl mx-auto">
                <h3 className="text-3xl mb-4 font-bold font-poppins">
                    {props.Title}
                </h3>
                <CMSContent>{props.Text}</CMSContent>
                <div className="flex justify-around mt-10 flex-row">
                    {kois.map((k) => (
                        <Koi key={k.id} {...k} />
                    ))}
                </div>
                <div className="flex flex-row justify-center mt-5">
                    <Button onClick={regenerate} colorScheme={'cherry'}>
                        Show more
                    </Button>
                </div>
            </div>
        </Section>
    )
}

export default GetYourKoi
