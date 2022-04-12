import { useLazyQuery } from '@apollo/client'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { FETCH_EVENTS } from '@crypto-koi/common/lib/graphql/queries/cryptogotchi'
import {
    FetchEvents,
    FetchEventsVariables,
} from '@crypto-koi/common/lib/graphql/queries/__generated__/FetchEvents'
import { notEmpty } from '@crypto-koi/common/lib/validators'
import moment from 'moment'
import React, { FunctionComponent, useEffect } from 'react'
import useInput from '../hooks/useInput'

interface Props {
    cryptogotchiId: string
    onClose: () => void
    nameSaveLoading: boolean
    nameSaveDisabled: boolean
    isOpen: boolean
    initialValue: string
    onNameSave: (newName: string) => void
}
const CryptModal: FunctionComponent<Props> = (props) => {
    const {
        cryptogotchiId,
        isOpen,
        onClose,
        onNameSave,
        nameSaveLoading,
        nameSaveDisabled,
        initialValue,
    } = props
    const name = useInput({ initialState: initialValue, validator: notEmpty })

    const {
        fetchMore,
        data: events,
        refetch,
    } = useLazyQuery<FetchEvents, FetchEventsVariables>(FETCH_EVENTS, {
        variables: { id: cryptogotchiId, offset: 0, limit: 20 },
    })[1]

    useEffect(() => {
        if (isOpen) {
            refetch()
        }
    }, [isOpen, refetch])

    return (
        <Modal isCentered size={'xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent margin={'2'}>
                <ModalHeader>CryptoKoi</ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={0}>
                    <div className="px-4">
                        <FormControl className="mb-5">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input variant={'filled'} id="name" {...name} />
                        </FormControl>
                    </div>
                    <span className="font-medium mb-2 block px-4">Events</span>
                    <div className="bg-slate-100 overflow-auto max-h-96 p-4 rounded-lg">
                        {events?.events.length === 0 && (
                            <div>No events yet</div>
                        )}
                        {events?.events.map((event) => (
                            <div
                                key={event.id}
                                className="mb-2 bg-slate-200 p-2 rounded-lg"
                            >
                                <span className="block">
                                    You fed {props.initialValue} with{' '}
                                    {event.payload} food
                                </span>
                                <span className="text-sm">
                                    {moment(event.createdAt).format(
                                        'DD.MM.YYYY HH:mm:ss'
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant={'ghost'} mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        disabled={nameSaveDisabled}
                        isLoading={nameSaveLoading}
                        onClick={() => onNameSave(name.value)}
                        colorScheme={'cherry'}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CryptModal
