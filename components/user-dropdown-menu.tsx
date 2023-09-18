import React from 'react'
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative h-12 w-12 rounded-full hover:ring-4 hover:ring-slate-950"
        >
          <Avatar className="h-12 w-12">
            {/* <AvatarImage src="/avatars/default-user-avatar.png" alt="@shadcn" /> */}
            <AvatarImage />
            {/* <img src="/avatars/default-user-avatar.png" alt="" /> */}
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
