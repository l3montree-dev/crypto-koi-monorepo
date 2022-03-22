import { EmailIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { IFooter } from '../cms/page'
import CMSContent from './CMSContent'

interface Props extends IFooter {}

export const Footer: FunctionComponent<Props> = (props) => {
  return (
    <>
      <footer className="bg-sea-600 text-white">
        <div className="p-3 max-w-screen-2xl mx-auto py-10">
          <h4 className="mb-4 text-2xl font-poppins font-bold">
            {props.Title}
          </h4>
          <CMSContent>{props.Text}</CMSContent>

          <div className="flex pb-8 flex-row items-center">
            <a href={props.E_Mail_With_PGP.Mail_to_Link}>
              <Button leftIcon={<EmailIcon />} colorScheme={'cherry'}>
                {props.E_Mail_With_PGP.E_Mail}
              </Button>
            </a>
          </div>
          <div className="flex">
            <div>
              <h4 className="mb-4 font-bold text-xl">
                {props.Follow_us.Title}
              </h4>
              {props.Follow_us.Social_Link.map((link) => (
                <div className="mb-2" key={link.id}>
                  <a
                    target={'_blank'}
                    href={link.Link}
                    className="flex flex-row items-center"
                    rel="noreferrer"
                  >
                    <Image
                      alt={link.Social_Channel}
                      width={15}
                      height={15}
                      src={'/assets/' + link.Social_Channel + '.svg'}
                    />

                    <span className="text-white ml-2">
                      {link.Social_Channel}
                    </span>
                  </a>
                </div>
              ))}
            </div>
            <div className="ml-24">
              <h4 className="mb-4 font-bold text-xl">Legal</h4>
              <div className="mb-2">
                <a
                  href={'/app-privacy-policy'}
                  className="flex flex-row items-center"
                  rel="noreferrer"
                >
                  <span className="text-white">Privacy Policy (App)</span>
                </a>
              </div>
              <div className="mb-2">
                <a
                  href={'/terms-of-use'}
                  className="flex flex-row items-center"
                  rel="noreferrer"
                >
                  <span className="text-white">Terms of Use (App)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-sea-800 px-3 py-2 pb-16 md:pb-2" id="colophon">
        <div className="max-w-screen-2xl flex-wrap flex flex-row items-center justify-between mx-auto">
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
              © {new Date().getFullYear()} l3montree
            </span>
          </a>
          <div className="text-white opacity-50 text-sm">
            <a
              className="mr-4"
              href="https://l3montree.com/en/privacy-policy"
              target={'_blank'}
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="https://l3montree.com/en/imprint"
              target={'_blank'}
              rel="noreferrer"
            >
              Imprint
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
