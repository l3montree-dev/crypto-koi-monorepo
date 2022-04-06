import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IMenu } from '../cms/menu'
import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { colors } from '../../styles/theme'

const renderMenu = (menu: IMenu['Parents']) => {
    return menu.map((item) => {
        if (item.Children && item.Children.length > 0) {
            return (
                <Menu key={item.id}>
                    <MenuButton
                        bgColor={'rgba(255,255,255,0.05)'}
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
                        item.Link.startsWith('http://') ||
                        item.Link.startsWith('https://')
                            ? '_blank'
                            : '_self'
                    }
                >
                    <Button
                        _hover={{
                            bgColor: colors.slate['200'],
                            color: 'white',
                        }}
                        className="mx-2"
                        bgColor={'rgba(255,255,255,0.05)'}
                    >
                        {item.Title}
                    </Button>
                </a>
            </Link>
        )
    })
}

interface Props extends IMenu {
    animate: boolean
}
function Header(props: Props) {
    const isScrolled = useRef(false)
    const [bg, setBg] = useState(props.animate ? '' : 'scrolled')

    useEffect(() => {
        if (props.animate) {
            const scrollList = () => {
                if (window.scrollY > 0 && !isScrolled.current) {
                    setBg('scrolled')
                    isScrolled.current = true
                } else if (window.scrollY <= 0 && isScrolled.current) {
                    setBg('')
                    isScrolled.current = false
                }
            }

            window.addEventListener('scroll', scrollList)
            return () => window.removeEventListener('scroll', scrollList)
        }
    }, [props.animate])
    return (
        <header className={'p-3 md:p-4 fixed top-0 left-0 right-0 z-10 ' + bg}>
            <div className="flex-row justify-between max-w-screen-2xl mx-auto flex items-center">
                <Link passHref={true} href="/">
                    <a className="flex-row flex items-center">
                        <div className="bg-white rounded-full w-9 h-9 flex flex-row items-center justify-center p-1">
                            <Image
                                alt="Logo"
                                width={30}
                                height={30}
                                src="/assets/crypto-koi-logo.svg"
                            />
                        </div>
                        <span className="title pl-2 font-bold">CryptoKoi</span>
                    </a>
                </Link>
                <div className="hidden items-center font-bold md:flex">
                    {renderMenu(props.Parents)}
                    <Link href="/register">
                        <a>
                            <Button
                                className="start-button mx-2"
                                colorScheme={'cherry'}
                            >
                                Start
                            </Button>
                        </a>
                    </Link>
                    <a
                        target="_blank"
                        className="text-white mx-2"
                        href="https://github.com/l3montree-dev"
                        rel="noreferrer"
                    >
                        <IconButton
                            bgColor={'rgba(255,255,255,0.1)'}
                            aria-label="GitHub"
                            _hover={{ bgColor: colors.slate['200'] }}
                            icon={
                                <svg
                                    width="25px"
                                    height="25px"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"
                                    />
                                </svg>
                            }
                        />
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header
