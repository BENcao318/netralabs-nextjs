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
import Image, { StaticImageData } from 'next/image'
import blueprintImage from '@/components/images/BlueprintImage.png'
import {
  Youtube,
  calculateTimeForHackathon,
  getVimeoThumbnailUrl,
} from '@/helpers/utils'
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

  const [imgUrl, setImgUrl] = useState<string | StaticImageData>('')
  const router = useRouter()

  useEffect(() => {
    const getImgUrl = async () => {
      if (project?.videoUrl.includes('youtube.com')) {
        const imageUrl = Youtube.thumb(project.videoUrl, 'small')
        setImgUrl(imageUrl)
      } else if (project?.videoUrl.includes('vimeo.com')) {
        const imageUrl = await getVimeoThumbnailUrl(project.videoUrl)
        setImgUrl(imageUrl)
      } else {
        setImgUrl(blueprintImage)
      }
    }
    getImgUrl()
  }, [project?.videoUrl, setImgUrl])

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
          src={imgUrl}
          width={400}
          height={300}
          priority={true}
          alt="Thumbnail"
          className="w-full h-full rounded-lg"
        />

        <div className="flex flex-col gap-3">
          <Badge
            className={`w-fit ${
              progress.isRunning ? 'bg-green-600' : 'bg-sky-600'
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
              className="rounded-lg px-4 font-boldnormal text-xl  text-slate-900 w-fit mx-auto border-4 border-slate-900 uppercase"
            >
              submitted
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="rounded-lg px-4 font-bold text-md bg-slate-600 text-slate-100 w-fit mx-auto uppercase"
            >
              Not submitted
            </Badge>
          )}

          {progress.isRunning ? (
            <Button
              className="w-fit px-4 text-xl mt-2 font-bold mx-auto border-2 border-slate-950 bg-slate-100 text-slate-950 hover:text-slate-100"
              onClick={() =>
                router.push(`/dashboard/projects/edit?pid=${project.id}`)
              }
            >
              Click to edit project
            </Button>
          ) : (
            <Button
              className="w-fit px-4 text-xl mt-2 font-bold mx-auto border-2 border-slate-950 bg-slate-100 text-slate-950 hover:text-slate-100"
              onClick={() =>
                router.push(`/dashboard/projects/view?pid=${project.id}`)
              }
            >
              Click to view project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
