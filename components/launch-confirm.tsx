'use client'

import React from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

export default function LaunchConfirm({ confirm }: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="relative bg-lime-600">🚀 Launch Hackathon</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black text-xl">
            Confirm launch the hackathon?
          </DialogTitle>
          <DialogDescription className="text-md">
            Once launched, the hackathon will be visible to the public
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-6">
          <DialogClose asChild>
            <Button variant="destructive" className="hover:bg-red-200">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-green-600 hover:bg-green-200"
              onClick={confirm}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
