import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <header className="p-3">
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
