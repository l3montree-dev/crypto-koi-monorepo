import React, {
    FunctionComponent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { colors } from '../../styles/theme'
import RoundProgress from './RoundProgress'
import Image from 'next/image'
import moment, { Moment } from 'moment'
import { ticker } from '@crypto-koi/common/lib/Ticker'

interface Props {
    id: string
    maxLifetimeMinutes: number
    minutesTillDeath: number
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

const Lifetime: FunctionComponent<Props> = (props) => {
    const [clock, setNow] = useState(moment())
    const till = useMemo(() => {
        const d = moment()
        d.add(props.minutesTillDeath, 'minutes')
        return moment(d.toISOString())
    }, [props.minutesTillDeath])

    useEffect(() => {
        ticker.addTickHandler(props.id, () => setNow(moment()))
        return () => ticker.removeTickHandler(props.id)
    }, [props.id])
    const progress =
        clock.diff(till, 'seconds') / (props.maxLifetimeMinutes * 60)

    // console.log(till.current.add(props.minutesTillDeath, 'minutes'))
    return (
        <div className="flex-col flex items-center justify-center ">
            <RoundProgress
                circleOneStroke={colors.cherry[500]}
                circleTwoStroke="#BBBBBB"
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
            <span className="text-sm text-white opacity-75 mt-2">
                {transformToString(clock, till)}
            </span>
        </div>
    )
}

export default Lifetime
