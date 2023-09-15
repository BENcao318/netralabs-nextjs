'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import BrandImg from '@/components/images/BrandImage.png'

const ManagerNavbar = () => {
  const handleClick = () => {
    signOut()
  }

  return (
    <>
      <div className="sticky top rounded-lg transition-all px-0 py-6 w-full flex items-center">
        <div className="flex items-center absolute right-1/2">
          <Link href="/manager" className="flex items-center gap-4 py-6 px-8">
            <Image src={BrandImg} className="mx-auto w-12 h-12" alt="img" />
            <p className="font-bold text-4xl">NetraLabs</p>
          </Link>
        </div>

        <Button className="absolute right-6" onClick={handleClick}>
          Sign out
        </Button>
      </div>
    </>
  )
}

export default ManagerNavbar
