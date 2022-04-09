import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { ticker } from '@crypto-koi/common/lib/Ticker'
import TimeUtils from '@crypto-koi/common/lib/TimeUtils'

interface Props {
    date: Moment
    id: string
}

function Clock(props: Props) {
    const [value, setValue] = useState(moment())
    useEffect(() => {
        ticker.addTickHandler(props.id, () => setValue(moment()))
        return () => ticker.removeTickHandler(props.id)
    }, [props.date, props.id])

    return <span>{TimeUtils.getTimeString(value, props.date)}</span>
}

export default Clock
