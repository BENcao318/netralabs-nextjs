'use client'

import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@/lib/types'

type UserDropdownMenuProps = {
  handleSignOut: () => void
  user: User
  goToUserProfile: () => void
}

export default function UserDropdownMenu({
  handleSignOut,
  user,
  goToUserProfile,
}: UserDropdownMenuProps) {
  const [avatar, setAvatar] = useState<string>('')
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await fetch('/api/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        console.log('data', data)
        setAvatar(data.userPreference.avatar)
      }
    }
    getUserProfile()
  }, [setAvatar])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative h-12 w-12 rounded-full hover:ring-2 hover:ring-teal-200"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} alt={user.name} />
            <AvatarFallback className="text-slate-950 font-bold text-2xl">
              {user.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={goToUserProfile}
            className="cursor-pointer focus:bg-slate-600 focus:text-white rounded-md"
          >
            Edit Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer focus:bg-slate-600 focus:text-white rounded-md"
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
