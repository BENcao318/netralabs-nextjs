'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import BrandImg from '@/components/images/BrandImage.png'
import { useRouter } from 'next/navigation'

export default function ManagerNavbar() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
    signOut()
  }

  return (
    <>
      <div className="sticky top rounded-lg transition-all px-6 py-6 w-full flex items-center justify-between ">
        <div></div>
        <div className="flex items-center ">
          <Link href="/manager" className="flex items-center gap-4 px-8">
            <Image src={BrandImg} className="mx-auto w-12 h-12" alt="img" />
            <p className="font-bold text-4xl">NetraLabs</p>
          </Link>
        </div>

        <Button className="" onClick={handleClick}>
          Sign out
        </Button>
      </div>
    </>
  )
}
