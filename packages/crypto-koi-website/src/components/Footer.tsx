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
      <footer className="bg-cherry-800 text-white">
        <div className="p-3 max-w-screen-2xl mx-auto pt-5">
          <h4 className="mb-4 text-xl font-bold">{props.Title}</h4>
          <CMSContent>{props.Text}</CMSContent>

          <div className="flex pb-5 flex-row items-center">
            <a href={props.E_Mail_With_PGP.Mail_to_Link}>
              <Button leftIcon={<EmailIcon />} colorScheme={'cherry'}>
                {props.E_Mail_With_PGP.E_Mail}
              </Button>
            </a>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-xl">{props.Follow_us.Title}</h4>
            {props.Follow_us.Social_Link.map((link) => (
              <div className="mb-2" key={link.id}>
                <a
                  className="text-white flex flex-row items-center"
                  href={link.Link}
                >
                  <Image
                    alt={link.Social_Channel}
                    width={15}
                    height={15}
                    src={'/assets/' + link.Social_Channel + '.svg'}
                  />
                  <span className="text-white ml-2">{link.Social_Channel}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </footer>
      <div className="bg-cherry-900 px-3 py-2 pb-16 md:pb-2" id="colophon">
        <div className="max-w-screen-2xl mx-auto">
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
      </div>
    </>
  )
}
