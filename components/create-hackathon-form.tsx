'use client'

import { TCreateHackathonSchema, createHackathonSchema } from '@/lib/types'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import uuid from 'react-uuid'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { addDays, format } from 'date-fns'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Tiptap from './richTextEditor'
import { useRouter } from 'next/navigation'
import { PrizeCard } from './prizeCard'
import CreatePrizeForm from './create-prize-form'
import DateAndTimeZonePicker from './date-and-time-zone-picker'
import { ITimezone } from 'react-timezone-select'
import { DateRange } from 'react-day-picker'
import { Icons } from './ui/ui-icons'
import { useToast } from './ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

type CreateHackathonFormValues = z.infer<typeof createHackathonSchema>

const defaultValues: Partial<CreateHackathonFormValues> = {
  // name: 'New Hackathon',
  // email: 'cby204@gmail.com',
}

export type Prize = {
  id: string
  name: string
  value: string
  numberOfWinningTeams: string
  description: string
  isEditing?: boolean
}

export default function CreateHackathonForm({
  creatorId,
}: {
  creatorId: string
}) {
  const router = useRouter()

  const [descriptionContent, setDescriptionContent] = useState<string>('')
  const [requirementContent, setRequirementContent] = useState<string>('')
  const [rulesContent, setRulesContent] = useState<string>('')
  const [resourcesContent, setResourcesContent] = useState<string>('')
  const [judgesContent, setJudgesContent] = useState<string>('')
  const [partnersContent, setPartnersContent] = useState<string>('')
  const [prizeList, setPrizeList] = useState<Prize[]>([])
  const [timeZone, setTimeZone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(year, month, day),
    to: addDays(new Date(year, month, day), 20),
  })

  const form = useForm<TCreateHackathonSchema>({
    resolver: zodResolver(createHackathonSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { toast } = useToast()

  const onSubmit = async (data: TCreateHackathonSchema) => {
    const formData = {
      ...data,
      dateRange: date,
      managerEmail: data.email,
      descriptionContent,
      requirementContent,
      rulesContent,
      resourcesContent,
      judgesContent,
      partnersContent,
      prizes: prizeList,
      creatorId,
    }

    try {
      const res = await fetch('/api/manage/hackathons/', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast({
          title: 'Success!',
          description: 'A new hackathon has been created.',
        })
      }
    } catch (error) {
      // Handle the error
      console.error('Error creating hackathon:', error)
      throw new Error('Failed to create hackathon')
    }
  }

  const addPrize = () => {
    const prize = {
      id: uuid(),
      name: '',
      value: '0',
      numberOfWinningTeams: '1',
      description: '',
      idEditing: true,
    }

    const updatedPrizeList = Array.isArray(prizeList)
      ? [...prizeList, prize]
      : [prize]
    setPrizeList(updatedPrizeList)
  }

  const removeElement = (
    prize: Prize,
    prizeList: Prize[],
    setPrizeList: any
  ) => {
    const newPrizeList = prizeList.filter((elm) => elm.id !== prize.id)
    setPrizeList(newPrizeList)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hackathon name"
                  {...field}
                  className="text-black font-bold text-lg"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                This is the name of your public hackathon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Tagline</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tagline"
                  {...field}
                  className="text-black font-bold text-lg"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                Create a tagline for the hackathon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Contact email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  {...field}
                  className="text-black font-bold text-lg"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                Participants can use this email to contact the manager of the
                hackathon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Virtual or in-person, e.g.(Toronto, Canada, campus)"
                  {...field}
                  className="text-black font-bold text-lg"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                Location of the hackathon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h1 className="mb-2 text-md font-semibold">Description</h1>
          <Tiptap
            content={descriptionContent}
            setContent={setDescriptionContent}
            placeholder="Description of the hackathon. e.g. Introduction, about the company, schedules."
          />
          <p className="text-sm text-slate-100 mt-2">
            Description of the hackathon. e.g. Introduction, about the company,
            schedules.
          </p>
        </div>
        <div>
          <h1 className="mb-2 text-md font-semibold">Requirements</h1>
          <Tiptap
            content={requirementContent}
            setContent={setRequirementContent}
            placeholder="Requirements for building the hackathon project and what the
            participants needed when submitting."
          />
          <p className="text-sm text-slate-100 mt-2">
            Requirements for building the hackathon project and what the
            participants needed when submitting.
          </p>
        </div>
        <div>
          <h1 className="mb-2 text-md font-semibold">Rules</h1>
          <Tiptap
            content={rulesContent}
            setContent={setRulesContent}
            placeholder="Rules of the contest. Inculding legal requirements and code of
            conduct."
          />
          <p className="text-sm text-slate-100 mt-2">
            Rules of the contest. Inculding legal requirements and code of
            conduct.
          </p>
        </div>
        <div>
          <h1 className="mb-2 text-md font-semibold">Resources</h1>
          <Tiptap
            content={resourcesContent}
            setContent={setResourcesContent}
            placeholder="Resources for the hackathon that can be helpful for participants.
            e.g. technical support tools, links, additional documents, etc."
          />
          <p className="text-sm text-slate-100 mt-2">
            Resources for the hackathon that can be helpful for participants.
            e.g. technical support tools, links, additional documents, etc.
          </p>
        </div>
        <div>
          <h1 className="mb-2 text-md font-semibold">Judges</h1>
          <Tiptap
            content={judgesContent}
            setContent={setJudgesContent}
            placeholder="Information of judges. e.g. name, title, personal link."
          />
          <p className="text-sm text-slate-100 mt-2">
            Information of judges. e.g. name, title, personal link.
          </p>
        </div>
        <div>
          <h1 className="mb-2 text-md font-semibold">Partners</h1>
          <Tiptap
            content={partnersContent}
            setContent={setPartnersContent}
            placeholder="Information of partners. e.g. name, description, link."
          />
          <p className="text-sm text-slate-100 mt-2">
            Information of partners. e.g. name, description, link.
          </p>
        </div>
        <div>
          <h1 className="mb-1 text-lg font-semibold dark:text-white">Prizes</h1>
          <div className="flex flex-col gap-2">
            {Array.isArray(prizeList) &&
              prizeList.map((prize) => {
                return prize.isEditing ? (
                  <CreatePrizeForm
                    prize={prize}
                    removeElement={removeElement}
                    prizeList={prizeList}
                    setPrizeList={setPrizeList}
                    key={prize.id}
                  />
                ) : (
                  <PrizeCard
                    key={prize.id}
                    prize={prize}
                    removeElement={removeElement}
                    prizeList={prizeList}
                    setPrizeList={setPrizeList}
                  />
                )
              })}
          </div>
          <Button
            type="submit"
            onClick={addPrize}
            className="flex items-center gap-4 mt-2"
          >
            Create prize
          </Button>
        </div>

        <DateAndTimeZonePicker
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          date={date}
          setDate={setDate}
        />

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="p-6 text-lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
          <div
            className="font-bold text-red-500 underline cursor-pointer text-center ml-6 text-lg"
            onClick={() => router.push('/manager')}
          >
            Cancel
          </div>
        </div>
      </form>
    </Form>
  )
}