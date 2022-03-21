import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { ITechPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
import Toast from '../components/Toast'

const Tech: FunctionComponent<ITechPB> = (props) => {
  const toast = useToast()
  return (
    <Section>
      <div className="max-w-screen-xl mx-auto md:flex flex-row px-4">
        <div className="md:w-1/3 md:mr-10">
          <CMSContent>{props.Smart_Contract.Text}</CMSContent>
          <div className="flex-row flex">
            <div className="p-2 mr-2 truncate bg-slate-200 overflow-hidden rounded-md">
              {props.Smart_Contract.Contract_Address}
            </div>
            <Button
              onClick={() => {
                const success = copy(props.Smart_Contract.Contract_Address)
                if (success) {
                  toast({
                    title: 'Copied!',
                    render: () => {
                      return <Toast msg="Copied!" />
                    },
                  })
                } else {
                  toast({
                    render: () => {
                      return <Toast msg="Failed to copy!" />
                    },
                  })
                }
              }}
              colorScheme={'cherry'}
            >
              Copy
            </Button>
          </div>
          <span className="opacity-75 text-xs">
            {props.Smart_Contract.Contract_Address}
          </span>
        </div>
        <div className="mt-10 md:w-1/3 md:mt-0 md:mx-5">
          <CMSContent>{props.Blockchain.Text}</CMSContent>

          <Button
            leftIcon={
              props.Blockchain.Button.Icon ? (
                <Image
                  alt={
                    props.Blockchain.Button.Icon.data.attributes.alternativeText
                  }
                  src={props.Blockchain.Button.Icon.data.attributes.url}
                  width={25}
                  height={25}
                />
              ) : undefined
            }
            colorScheme={'sea'}
          >
            {props.Blockchain.Button.Text}
          </Button>
          <span className="bg-slate-200 text-sm font-bold rounded-full px-2 py-1 ml-2">
            ~ {props.Blockchain.Value_NFT}$ / NFT
          </span>
        </div>
        <div className="mt-10 md:w-1/3 md:mt-0 md:ml-10">
          <CMSContent>{props.Open_Source.Text}</CMSContent>
          <Button
            leftIcon={
              props.Open_Source.Button.Icon ? (
                <Image
                  alt={
                    props.Open_Source.Button.Icon.data.attributes
                      .alternativeText
                  }
                  src={props.Open_Source.Button.Icon.data.attributes.url}
                  width={25}
                  height={25}
                />
              ) : undefined
            }
            colorScheme={'cherry'}
          >
            {props.Open_Source.Button.Text}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default Tech
