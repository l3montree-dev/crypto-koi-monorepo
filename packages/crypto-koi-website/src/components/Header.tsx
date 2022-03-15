import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IMenu } from '../cms/menu'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { colors } from '../../styles/theme'

const renderMenu = (menu: IMenu['Parents']) => {
  console.log(menu)
  return menu.map((item) => {
    if (item.Children && item.Children.length > 0) {
      return (
        <Menu key={item.id}>
          <MenuButton
            bgColor={colors.soft['500']}
            as={Button}
            aria-label="Options"
          >
            {item.Title}
          </MenuButton>
          <MenuList>
            {item.Children.map((item) => (
              <Link href={item.Link} key={item.id}>
                <a
                  target={
                    item.Link.startsWith('http://') ||
                    item.Link.startsWith('https://')
                      ? '_blank'
                      : '_self'
                  }
                >
                  <MenuItem>{item.Title}</MenuItem>
                </a>
              </Link>
            ))}
          </MenuList>
        </Menu>
      )
    }
    return (
      <Link key={item.id} href={item.Link}>
        <a
          target={
            item.Link.startsWith('http://') || item.Link.startsWith('https://')
              ? '_blank'
              : '_self'
          }
        >
          <Button className="mx-5" bgColor={colors.soft['500']}>
            {item.Title}
          </Button>
        </a>
      </Link>
    )
  })
}

interface Props extends IMenu {}
function Header(props: Props) {
  const bgRef = useRef('bg-soft')
  const [bg, setBg] = useState('bg-soft')

  useEffect(() => {
    const scrollList = () => {
      if (window.scrollY > 0 && bgRef.current === 'bg-soft') {
        setBg('bg-white shadow-lg')
        bgRef.current = 'bg-white shadow-lg'
      } else if (window.scrollY <= 0) {
        setBg('bg-soft')
        bgRef.current = 'bg-soft'
      }
    }
    window.addEventListener('scroll', scrollList)
    return () => window.removeEventListener('scroll', scrollList)
  }, [])
  return (
    <header className={'p-3 md:p-5 fixed top-0 left-0 right-0 z-10 ' + bg}>
      <div className="flex-row justify-between max-w-screen-2xl mx-auto flex items-center">
        <Link passHref={true} href="/">
          <a className="flex-row flex items-center">
            <Image
              alt="Logo"
              width={30}
              height={30}
              src="/assets/crypto-koi-logo.svg"
            />
            <span className="title pl-2 font-poppins text-xl font-bold">
              Crypto-Koi.io
            </span>
          </a>
        </Link>
        <div className="hidden items-center font-bold md:flex">
          {renderMenu(props.Parents)}
          <a
            target="_blank"
            className="ml-6"
            href="https://gitlab.com/l3montree/crypto-koi"
            rel="noreferrer"
          >
            <div className="bg-black rounded-full h-8 w-8 flex flex-row justify-center items-center text-white">
              <Image
                alt="Gitlab Logo"
                width={25}
                height={25}
                src="/assets/gitlab.svg"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
