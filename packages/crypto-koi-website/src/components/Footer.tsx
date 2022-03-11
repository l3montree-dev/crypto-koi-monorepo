import { EmailIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { IFooter } from '../cms/page'
import CMSContent from './CMSContent'

interface Props extends IFooter {}

export const Footer: FunctionComponent<Props> = (props) => {
  console.log(props)
  return (
    <>
      <footer className="bg-cherry-800 mt-5 text-white">
        <div className="p-3 pt-5">
          <h4 className="mb-4">{props.Title}</h4>
          <CMSContent>{props.Text}</CMSContent>

          <div className="flex pb-5 flex-row items-center">
            <Button leftIcon={<EmailIcon />} colorScheme={'cherry'}>
              {props.E_Mail_With_PGP.E_Mail}
            </Button>
          </div>
        </div>
      </footer>
      <div className="bg-cherry-900 px-3 py-2" id="colophon">
        <a
          target={'_blank'}
          className="items-center flex-row flex"
          href="https://l3montree.com"
          rel="noreferrer"
        >
          <Image
            alt="l3montree logo"
            width={25}
            height={25}
            src="/assets/l3mon.svg"
          />
          <span className="text-white pl-2 opacity-50 text-sm">
            Picked from l3montree
          </span>
        </a>
      </div>
    </>
  )
}
