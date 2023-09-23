'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import {
  Project,
  TInviteTeammateSchema,
  inviteTeammateSchema,
} from '@/lib/types'
import { Separator } from './ui/separator'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icons } from './ui/ui-icons'

const TEAMSIZE = 5
const getTitleAndDescription = (project: Project, userId: string) => {
  let title = ''
  let description = ''
  if (project.participants.length === 0) {
    title = 'You are soloing'
    description = 'Invite people to join. Team size limit: 5'
  } else {
    if (project.creatorId === userId) {
      title = 'You are project lead'
      if (project.participants.length < TEAMSIZE - 1) {
        description = 'Invite people to join. Team size limit: 5'
      } else {
        description = 'Your team is full.'
      }
    } else {
      title = 'You are part of the team'
      description = 'Ask project lead to edit'
    }
  }

  return {
    title,
    description,
  }
}

export default function ProjectTeamCard({
  userId,
  project,
}: {
  userId: string
  project: Project | any
}) {
  const header = getTitleAndDescription(project, userId)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TInviteTeammateSchema>({
    resolver: zodResolver(inviteTeammateSchema),
  })

  const onSubmit = async (data: TInviteTeammateSchema) => {
    console.log(data)
  }

  return (
    <Card className="w-[360px] bg-slate-700 border-none">
      <CardHeader className="pb-3 text-center grid grid-rows-2">
        <CardTitle className="text-slate-100">{header.title}</CardTitle>
        <CardDescription className="text-slate-100 text-md">
          {header.description}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2"></CardContent>
      <CardFooter className="flex justify-center w-full">
        {project.participants.length < TEAMSIZE - 1 &&
          project.creatorId === userId && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-xl border-2 bg-slate-200 text-slate-900 border-slate-900 hover:text-slate-200 font-bold font-mono">
                  Invite teammate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-slate-900">
                  <DialogTitle className="text-xl font-bold">
                    Invite a teammate by email
                  </DialogTitle>
                  <DialogDescription>
                    Type the email of the person you want to invite
                  </DialogDescription>
                </DialogHeader>
                <form className="text-slate-900">
                  <Input
                    {...register('email')}
                    id="name"
                    placeholder="Email"
                    className="col-span-3"
                  />
                  {errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                  )}
                </form>
                <DialogFooter>
                  <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    className="bg-green-700"
                  >
                    {isSubmitting && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Send email
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
      </CardFooter>
    </Card>
  )
}
