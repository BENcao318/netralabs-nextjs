'use client'

import React, { useMemo, useState } from 'react'
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
import { calculateTimeForHackathon } from '@/helpers/utils'
import { useToast } from './ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
  const { toast } = useToast()
  const header = getTitleAndDescription(project, userId)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TInviteTeammateSchema>({
    resolver: zodResolver(inviteTeammateSchema),
  })
  const [openSendEmailDialog, setOpenSendEmailDialog] = useState(false)
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const progress = calculateTimeForHackathon(
    project.hackathon.startDate,
    project.hackathon.endDate,
    project.hackathon.timeZone,
    localTimeZone
  ).progress

  const teamMembers = useMemo(() => {
    const arr = [project.creator, ...project.participants]
    const filteredArr = arr.filter((member) => member.id !== userId)
    return filteredArr
  }, [])
  const onSubmit = async (data: TInviteTeammateSchema) => {
    try {
      const res = await fetch('/api/projects/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          userId: userId,
          email: data.email,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        toast({
          title: 'Success!',
          description: 'You joined the hackathon.',
        })
        reset()
        setOpenSendEmailDialog(false)
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed 😓',
          description: res.statusText,
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Failed 😓',
        description: 'Something went wrong. Please try again.',
      })
    }
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
      <CardContent className="w-full mt-3 flex justify-center">
        {teamMembers.map((member) => {
          return (
            <div
              className="text-slate-100 text-xl font-bold grid grid-cols-2 items-center"
              key={member.id}
            >
              <Avatar className="h-11 w-11 mr-3">
                <AvatarImage
                  src={member.userPreference.avatar}
                  alt={member.name}
                />
                <AvatarFallback className="text-slate-100 font-bold text-2xl bg-slate-800">
                  {member.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {member.name}
            </div>
          )
        })}
      </CardContent>
      <CardFooter className="flex justify-center w-full">
        {project.participants.length < TEAMSIZE - 1 &&
          project.creatorId === userId &&
          progress.isRunning && (
            <Dialog
              open={openSendEmailDialog}
              onOpenChange={setOpenSendEmailDialog}
            >
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
            //todo add dialog close interaction on send email button when email is sent.  Add interaction on dialog for when email is failed to send. Show error message.
          )}
      </CardFooter>
    </Card>
  )
}
