import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { ticker } from '@crypto-koi/common/lib/Ticker'
import TimeUtils from '@crypto-koi/common/lib/TimeUtils'

interface Props {
    date: Moment
    id: string
    runTill?: Moment
}

function Clock(props: Props) {
    const [value, setValue] = useState(props.runTill ?? moment())
    useEffect(() => {
        if (!props.runTill || props.runTill.isAfter(moment())) {
            ticker.addTickHandler(props.id, () => setValue(moment()))
        }
        return () => {
            if (!props.runTill || props.runTill?.isAfter(moment()))
                ticker.removeTickHandler(props.id)
        }
    }, [props.date, props.id, props.runTill])

    return <span>{TimeUtils.getTimeString(value, props.date)}</span>
}

export default Clock
