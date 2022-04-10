import moment from 'moment'
import Image from 'next/image'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Lifetime from './Lifetime'

interface Props {
    src: string
    colors: string[]
    patterns: number
    species: string
    bgColor: string
}

const Koi: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <div className="overflow-hidden pt-2 rounded-lg shadow-lg">
                <div className="py-2 koi-gradient rounded-t-lg">
                    <div className="flex-row justify-center flex">
                        <div className="flex-col z-10 absolute items-center flex justify-center mt-2">
                            <div className="flex p-2 rounded-lg relative">
                                <Lifetime
                                    id={props.src}
                                    maxLifetimeMinutes={60}
                                    minutesTillDeath={moment()
                                        .endOf('hour')
                                        .diff(moment(), 'minute')}
                                />
                            </div>
                        </div>
                        <div className="mt-10">
                            <Image
                                quality={100}
                                alt="Koi Image"
                                width={350}
                                height={350}
                                src={props.src}
                            />
                        </div>
                    </div>
                    <div className="flex-row text-sea flex justify-start px-5">
                        <span className="font-bold text-2xl capitalize text-white font-poppins">
                            {props.species}
                        </span>
                    </div>
                    <div className="flex-row text-white py-2 pb-5 justify-center px-5 flex">
                        {props.colors.map((color, i) => (
                            <div
                                className={
                                    'border-black bg-sea-600 p-2 pb-1 mx-2 flex-col flex justify-center items-center rounded-lg ' +
                                    (i === 0 ? 'ml-0' : '')
                                }
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
                        <div className="border-black bg-sea-600 pb-1 p-2 mx-2 mr-0 flex-col flex justify-center items-center rounded-lg">
                            <div className="h-12 w-12 border-2 mb-1 font-bold flex-row flex items-center justify-center rounded-lg">
                                {props.patterns}
                            </div>
                            <span className="text-sm">Patterns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Koi
