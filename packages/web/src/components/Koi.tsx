import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
import moment, { Moment } from 'moment'
import RoundProgress from './RoundProgress'
import { colors } from '../../styles/theme'

interface Props {
    src: string
    colors: string[]
    patterns: number
    species: string
    bgColor: string
}

const fix2Digits = (n: number) => {
    return n < 10 ? '0' + n : n
}
const transformToString = (from: Moment, till: Moment) => {
    const diff = till.diff(from, 'seconds')
    const s = diff % 60
    const h = Math.floor(diff / (60 * 60))
    const m = Math.floor(diff / 60) % 60

    return '' + fix2Digits(h) + ':' + fix2Digits(m) + ':' + fix2Digits(s)
}

const Koi: FunctionComponent<Props> = (props) => {
    const [clock, setNow] = useState(moment())
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment())
        }, 1000)
        return () => clearInterval(interval)
    })
    const progress = moment().endOf('hour').diff(clock, 'seconds') / (60 * 60)
    return (
        <div>
            <div className="overflow-hidden pt-2 rounded-lg shadow-lg">
                <div
                    className="py-2 rounded-t-lg"
                    style={{ backgroundColor: props.bgColor }}
                >
                    <div className="flex-col items-center flex justify-center mt-2">
                        <div className="bg-glass border-glass border shadow-lg flex-col items-center justify-center flex p-2 rounded-lg relative">
                            <RoundProgress
                                circleOneStroke={colors.cherry[500]}
                                circleTwoStroke="black"
                                progress={progress}
                                strokeWidth={4}
                                size={55}
                            />
                            <div className="absolute top-6">
                                <Image
                                    width={25}
                                    height={25}
                                    alt="Heart"
                                    src="/assets/heart.svg"
                                />
                            </div>
                            <span className="text-xs text-black font-bold mt-2">
                                {transformToString(
                                    clock,
                                    moment().endOf('hour')
                                )}
                            </span>
                        </div>
                    </div>
                    <Image
                        quality={100}
                        alt="Koi Image"
                        width={300}
                        height={300}
                        src={props.src}
                    />

                    <div className="flex-row text-sea flex justify-end px-4">
                        <span className="bg-white rounded-full px-2 py-1 text-xs">
                            {props.species}
                        </span>
                    </div>
                </div>
                <div className="flex-row text-sea bg-white py-2 justify-center px-5 flex">
                    {props.colors.map((color, i) => (
                        <div
                            className="border-black mx-2 flex-col flex justify-center items-center rounded-lg"
                            key={color + '-' + i}
                        >
                            <div
                                className="h-12 w-12 mb-1 border-2  rounded-lg"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-sm">
                                {color.toLowerCase()}
                            </span>
                        </div>
                    ))}
                    <div className="border-black mx-2 flex-col flex justify-center items-center rounded-lg">
                        <div
                            className="h-12 w-12 border-2 mb-1 font-bold flex-row flex items-center justify-center rounded-lg"
                            style={{ backgroundColor: 'white' }}
                        >
                            {props.patterns}
                        </div>
                        <span className="text-sm">Patterns</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Koi
