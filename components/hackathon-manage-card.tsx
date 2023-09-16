import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Table } from 'lucide-react'
import { TableBody } from './ui/table'
import { convertDateString } from '@/helpers/utils'
import { Button } from './ui/button'

type Hackathon = {
  id: string | null
  name: string | null
  tagline: string | null
  timeZone: string | null
  startTime: string | Date | null
  endTime: string | Date | null
  managerEmail: string | null
  launched: boolean | null
  [key: string]: unknown
}

export default function HackathonManageCard({
  hackathon,
}: {
  hackathon: Hackathon
}) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
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
      name: 'Start time:',
      content: convertDateString(hackathon.startTime, options),
    },
    {
      name: 'Deadline:',
      content: convertDateString(hackathon.endTime, options),
    },
  ]

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
      <CardFooter className="pt-0 flex justify-between mx-12">
        <div className="flex gap-6 items-center">
          <Button>Preview</Button>
          <a className="font-medium text-blue-600 hover:underline cursor-pointer text-center">
            Edit
          </a>
        </div>
        {hackathon.launched ? (
          <p className="flex uppercase items-center font-bold text-green-600">
            launched
          </p>
        ) : (
          <Button className="bg-orange-600 hover:bg-orange-400">Launch</Button>
        )}
      </CardFooter>
    </Card>
  )
}
