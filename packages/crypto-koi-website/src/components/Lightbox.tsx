import { CloseIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'

interface Props {
  src: string
  width: number
  height: number
  alt: string
  text?: string
  onClose: () => void
}
const Lightbox: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      allowPinchZoom
      size={'2xl'}
      onClose={props.onClose}
      isOpen={true}
      isCentered
    >
      <ModalOverlay backdropFilter="auto" backdropBlur={'4px'} />
      <ModalContent className="mx-2">
        <ModalHeader />
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <Image
            {...props}
            // be quite, linter :-)
            alt={props.alt}
          />
          <div className="bg-slate-100 px-3 py-2 mb-2 rounded-lg">
            <p>{props.text}</p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Lightbox
