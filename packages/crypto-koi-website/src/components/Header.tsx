import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function Header() {
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
        <div className="flex-row flex items-center">
          <Image
            alt="Logo"
            width={30}
            height={30}
            src="/assets/crypto-koi-logo.svg"
          />
          <span className="title pl-2 font-poppins text-xl font-bold">
            Crypto-Koi.io
          </span>
        </div>
        <div className="hidden font-bold md:flex">
          <span className="w-28">About</span>
          <span className="w-28">Features</span>
          <span className="w-28">Download App</span>
        </div>
      </div>
    </header>
  )
}

export default Header
