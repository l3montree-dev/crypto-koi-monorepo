import { Button } from '@chakra-ui/react'
import Cryptogotchi from '@crypto-koi/common/lib/mobx/Cryptogotchi'
import { ticker } from '@crypto-koi/common/lib/Ticker'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { config } from '../config'
import ProgressButton from './ProgressButton'

interface Props {
    cryptogotchi: Cryptogotchi

    disabled?: boolean
    onClick: () => void
    loading: boolean
}

const FeedButton: FunctionComponent<Props> = observer((props) => {
    const { cryptogotchi } = props
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        ticker.addTickHandler(cryptogotchi.id + '-feeding', () => {
            const seconds = cryptogotchi.nextFeeding.diff(moment(), 'seconds')

            // if seconds is negative - the date is in the past.
            if (seconds <= 0) {
                setSeconds(-1)
                return
            }
            setSeconds(config.secondsBetweenFeeding - seconds)
        })
        return () => {
            ticker.removeTickHandler(cryptogotchi.id + '-feeding')
        }
    }, [cryptogotchi.id, cryptogotchi.nextFeeding])
    if (seconds === -1) {
        // use a regular chakra button for the designing.
        return (
            <Button
                disabled={props.disabled}
                isFullWidth={true}
                onClick={props.onClick}
                height={'100%'}
                colorScheme="cherry"
            >
                Feed
            </Button>
        )
    }
    return (
        <ProgressButton
            {...props}
            progress={seconds / config.secondsBetweenFeeding}
        >
            {'Feed (' +
                moment
                    .utc((config.secondsBetweenFeeding - seconds) * 1000)
                    .format('HH:mm:ss') +
                ')'}
        </ProgressButton>
    )
})

export default FeedButton
