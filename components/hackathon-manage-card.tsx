'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { convertDateString } from '@/helpers/utils'
import { Button } from './ui/button'
import Link from 'next/link'
import { launchHackathon } from '@/app/libs/hackathons'
import LaunchConfirm from './launch-confirm'

type Hackathon = {
  id: string
  name: string | null
  tagline: string | null
  timeZone: string | null
  startDate: string | null
  endDate: string | null
  managerEmail: string | null
  launched: boolean | null
}

export default function HackathonManageCard({
  hackathon,
}: {
  hackathon: Hackathon
}) {
  const [launched, setLaunched] = useState(hackathon.launched)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // hour12: true,
  }

  const TABLE_ROWS = [
    {
      name: 'Email:',
      content: hackathon.managerEmail,
    },
    {
      name: 'Time zone:',
      content: hackathon.timeZone,
    },
    {
      name: 'Start Date:',
      content: convertDateString(hackathon.startDate, options),
    },
    {
      name: 'End Date:',
      content: convertDateString(hackathon.endDate, options),
    },
  ]

  const handleClick = async () => {
    const res = await fetch('/api/manage/hackathons/launch', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hackathonId: hackathon.id,
      }),
    })

    if (res.ok) {
      setLaunched(true)
    }
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-center text-xl">{hackathon.name}</CardTitle>
        <CardDescription className="text-center text-lg">
          {hackathon.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full min-w-max text-left">
          <tbody>
            {TABLE_ROWS.map(({ name, content }, index) => {
              const isLast = index === TABLE_ROWS.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50l'

              return (
                <tr key={name} className="even:bg-blue-gray-50/50">
                  <td className={classes}>
                    <div className="font-semibold">{name}</div>
                  </td>
                  <td className={classes}>
                    <div className="font-normal font-roboto ">
                      {content as React.ReactNode}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between mx-4">
        <div className="flex gap-6 items-center">
          <Button>Preview</Button>
          <Link
            className="font-medium text-blue-600 hover:underline cursor-pointer text-center"
            href={{
              pathname: '/manager/edit-hackathon',
              query: { hid: hackathon.id },
            }}
          >
            Edit
          </Link>
        </div>
        {launched ? (
          <p className="flex uppercase items-center font-bold text-green-600">
            launched
          </p>
        ) : (
          // <Button
          //   className="bg-orange-600 hover:bg-orange-400"
          //   onClick={handleClick}
          // >
          //   Launch
          // </Button>
          <LaunchConfirm confirm={handleClick} />
        )}
      </CardFooter>
    </Card>
  )
}
