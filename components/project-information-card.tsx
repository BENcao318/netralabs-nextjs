'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Image from 'next/image'
import blueprintImage from '@/components/images/BlueprintImage.png'
import { calculateTimeForHackathon } from '@/helpers/utils'
import { useRouter } from 'next/navigation'
import { Project } from '@/lib/types'
// import { is } from 'date-fns/locale'
// import { Youtube, getVimeoThumbnailUrl } from '@/lib/utils'

type ProjectInformationCardProps = {
  project: Project
  userId: string
}

export default function ProjectInformationCard({
  project,
  userId,
}: ProjectInformationCardProps) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const progress = calculateTimeForHackathon(
    project.hackathon.startDate,
    project.hackathon.endDate,
    project.hackathon.timeZone,
    localTimeZone
  ).progress

  const [data, setData] = useState<Object | null>(null)
  const router = useRouter()

  // useEffect(() => {
  //   getVimeoThumbnailUrl('https://vimeo.com/524933864')
  // }, [])

  //Example of usage:

  return (
    // <Card className="min-w-[420px] max-w-[600px] w-full">
    <Card className="w-[600px]">
      <CardHeader className="grid grid-cols-2 text-center">
        <div className="flex flex-col justify-center gap-2">
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.pitch}</CardDescription>
        </div>
        <div>
          <CardTitle className="text-xl">{project.hackathon.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 w-full mx-auto">
        <Image
          src={blueprintImage}
          alt="Blueprint Image"
          className="w-full h-full rounded-lg"
        />

        <div className="flex flex-col gap-3">
          <Badge
            className={`w-fit ${
              progress.running ? 'bg-green-600' : 'bg-sky-600'
            } mx-auto`}
          >
            <span className="w-full text-center text-lg">
              {progress.status}
            </span>
          </Badge>

          {project.participants.length === 0 ? (
            <p className="text-lg text-center uppercase font-bold font-serif text-orange-700">
              SOLOING
            </p>
          ) : project.creatorId === userId ? (
            <p className="text-lg text-center uppercase font-bold font-serif text-sky-700">
              As team leader
            </p>
          ) : (
            <p className="text-lg text-center uppercase font-bold font-serif text-sky-700">
              As team member
            </p>
          )}

          {project.isSubmitted ? (
            <Badge
              variant="outline"
              className="rounded-lg px-4 font-boldnormal text-xl  text-slate-900 w-fit mx-auto border-4 border-slate-900"
            >
              submitted
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="rounded-lg px-4 font-bold text-md bg-slate-600 text-slate-100 w-fit mx-auto"
            >
              Not submitted
            </Badge>
          )}

          <Button
            className="w-fit px-4 text-xl mt-2 font-bold mx-auto border-2 border-slate-950 bg-slate-100 text-slate-950 hover:text-slate-100"
            onClick={() =>
              router.push(`/dashboard/projects/edit?pid=${project.id}`)
            }
          >
            Click to view project
          </Button>

          {/* <img
            src={Youtube.thumb(
              'https://www.youtube.com/watch?v=CREM-mFuyyo&ab_channel=Dave2D',
              'small'
            )}
            alt=""
          /> */}
        </div>
      </CardContent>
    </Card>
  )
}
