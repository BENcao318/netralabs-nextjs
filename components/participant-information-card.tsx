import { Participant } from '@/lib/types'
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { GraduationCap, UserPlus2, Wrench } from 'lucide-react'

export default function ParticipantInformationCard({
  participant,
  setOpenInviteDialog,
  setSelectedUserId,
}: {
  participant: Participant
  setOpenInviteDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedUserId: React.Dispatch<React.SetStateAction<string>>
}) {
  const maxTotalCharacterCount = 50
  let totalCharacterCount = 0

  const handleClick = () => {
    setOpenInviteDialog((prev) => !prev)
    setSelectedUserId(participant.id)
  }

  return (
    <Card className="w-[400px] h-[160px]">
      <CardHeader className="py-2">
        <div className="flex justify-between">
          <div className="flex items-center px-2">
            <Avatar className="h-7 w-7 mr-3">
              <AvatarImage
                src={participant?.userPreference?.avatar || ''}
                alt={participant.name}
              />
              <AvatarFallback className="text-slate-100 font-semibold text-xl bg-slate-700">
                {participant.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold flex items-center">
              {participant.name}
            </span>
          </div>
          <Button
            className="bg-white py-0 px-2 rounded-full hover:bg-slate-700 group"
            onClick={handleClick}
          >
            <UserPlus2 className="h-6 w-6 text-slate-800 group-hover:text-white" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex w-full items-center">
          <div>
            <GraduationCap className="h-6 w-6 text-gray-600 mr-3" />
          </div>
          <p className="font-medium text-lg">
            {participant?.userPreference?.role !== null
              ? participant?.userPreference?.role.label
              : 'Not specified'}
          </p>
        </div>
        <div className="flex w-full items-start mt-2">
          <div>
            <Wrench className="h-6 w-6 text-gray-600 mr-3 self-start" />
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            {participant?.userPreference?.skills !== null ? (
              participant?.userPreference?.skills.map(
                (skill: any, index: number) => {
                  const skillLabel = skill.label

                  if (skillLabel) {
                    const skillCharacterCount = skillLabel.length

                    if (
                      totalCharacterCount + skillCharacterCount <=
                      maxTotalCharacterCount
                    ) {
                      totalCharacterCount += skillCharacterCount
                      return (
                        <div key={skillLabel}>
                          <span className="bg-slate-700 py-1 px-2 rounded-xl text-sm font-medium text-slate-100">
                            {skillLabel}
                          </span>
                        </div>
                      )
                    } else if (
                      index ===
                      participant?.userPreference?.skills.length - 1
                    ) {
                      return (
                        <span
                          className="text-slate-900 font-bold text-lg ml-2"
                          key="spread"
                        >
                          ...
                        </span>
                      )
                    }
                  }

                  return null
                }
              )
            ) : (
              <span className="font-medium text-lg text-slate-900">
                Not specified
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
