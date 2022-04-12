import { ClientCryptogotchi } from '@crypto-koi/common/lib/graphql/queries/__generated__/ClientCryptogotchi'
import Transformer from '@crypto-koi/common/lib/Transformer'
import moment from 'moment'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { BsTrophyFill } from 'react-icons/bs'
import { config } from '../config'
import Clock from './Clock'
import Lifetime from './Lifetime'

interface Props extends ClientCryptogotchi {
    hideAttributes?: boolean
}

const Koi: FunctionComponent<Props> = (props) => {
    console.log(props, Transformer.uuidToUint256(props.id))
    return (
        <div>
            <div className="overflow-hidden pt-2 rounded-lg shadow-lg">
                <div className="pt-2 koi-gradient rounded-t-lg">
                    <div className="flex-row relative justify-center flex">
                        <div className="flex-col z-10 absolute items-center flex justify-center mt-2">
                            <div className="flex p-2 rounded-lg relative">
                                <Lifetime
                                    id={props.id + '-lifetime-small'}
                                    maxLifetimeMinutes={
                                        props.maxLifetimeMinutes
                                    }
                                    minutesTillDeath={props.minutesTillDeath}
                                />
                            </div>
                        </div>
                        <div className="absolute left-5 top-4">
                            <div className="flex flex-row justify-start">
                                {props.rank > 0 && (
                                    <div className="bg-slate-600 text-slate-200 px-2 py-1 flex-row flex items-center rounded-lg text-xs">
                                        <BsTrophyFill />
                                        <span className="ml-2">
                                            {props.rank}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row justify-center my-2">
                                <div className="bg-slate-600 text-slate-200 px-2 py-1 rounded-lg text-xs">
                                    <Clock
                                        date={moment(props.createdAt)}
                                        id={props.id + '-clock'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Image
                                quality={100}
                                alt="Koi Image"
                                width={350}
                                height={350}
                                src={
                                    config.api +
                                    '/images/' +
                                    Transformer.uuidToUint256(props.id) +
                                    '?size=1024'
                                }
                            />
                        </div>
                    </div>
                    <div
                        className={
                            'flex-row text-sea flex justify-center px-5 ' +
                            (!Boolean(props.hideAttributes) ? '' : 'pb-7')
                        }
                    >
                        <span className="font-bold text-2xl text-center capitalize text-white font-poppins">
                            {props.name}
                        </span>
                    </div>
                    {!Boolean(props.hideAttributes) && (
                        <div className="flex-row text-white flex-wrap py-2 pb-5 justify-center px-5 flex">
                            {Object.entries(props.attributes)
                                .filter(([_, value]) => {
                                    return (
                                        typeof value === 'string' &&
                                        value.startsWith('#')
                                    )
                                })
                                .map(([attr, value]) => (
                                    <div
                                        className={
                                            'border-black mb-2 bg-sea-600 p-2 pb-1 mx-1 flex-col flex justify-center items-center rounded-lg'
                                        }
                                        key={attr}
                                    >
                                        <div
                                            className="h-12 w-12 mb-1 border-2  rounded-lg"
                                            style={{ backgroundColor: value }}
                                        />
                                        <span className="text-sm">
                                            {value.toLowerCase()}
                                        </span>
                                    </div>
                                ))}
                            <div className="border-black md:mb-2 mb-2 bg-sea-600 pb-1 p-2 mx-1 mr-0 flex-col flex justify-center items-center rounded-lg">
                                <div className="h-12 w-12 border-2 mb-1 font-bold flex-row flex items-center justify-center rounded-lg">
                                    {props.attributes.patternQuantity}
                                </div>
                                <span className="text-sm">Patterns</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Koi
