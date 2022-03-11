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
    <header className={'p-3 fixed top-0 left-0 right-0 z-10 ' + bg}>
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
    </header>
  )
}

export default Header
