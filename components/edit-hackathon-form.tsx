'use client'

import { TCreateHackathonSchema, createHackathonSchema } from '@/lib/types'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState, useMemo } from 'react'
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
// import { addDays } from 'date-fns'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Tiptap from './richTextEditor'
import { useRouter } from 'next/navigation'
import { PrizeCard } from './prizeCard'
import CreatePrizeForm from './create-prize-form'
// import DateAndTimeZonePicker from './date-and-time-zone-picker'
import TimezoneSelect from 'react-timezone-select'
// import { DateRange } from 'react-day-picker'
import { Icons } from './ui/ui-icons'
import { useToast } from './ui/use-toast'
import { Label } from '@radix-ui/react-label'
import { Card, CardContent } from './ui/card'
import { PlusCircle } from 'lucide-react'

type CreateHackathonFormValues = z.infer<typeof createHackathonSchema>
const defaultValues: Partial<CreateHackathonFormValues> = {}

export type Prize = {
  id: string
  name: string
  value: string
  numberOfWinningTeams: string
  description: string
  isEditing?: boolean
}

export default function EditHackathonForm({ hackathon }: { hackathon: any }) {
  const router = useRouter()
  const { toast } = useToast()

  const [descriptionContent, setDescriptionContent] = useState<string>('')
  const [requirementContent, setRequirementContent] = useState<string>('')
  const [rulesContent, setRulesContent] = useState<string>('')
  const [resourcesContent, setResourcesContent] = useState<string>('')
  const [judgesContent, setJudgesContent] = useState<string>('')
  const [partnersContent, setPartnersContent] = useState<string>('')
  const [prizeList, setPrizeList] = useState<Prize[]>([])
  const [timeZone, setTimeZone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  // const currentDate = new Date()
  // const year = currentDate.getFullYear()
  // const month = currentDate.getMonth()
  // const day = currentDate.getDate()

  const [timeZoneSelect, setTimeZoneSelect] = useState<any>(timeZone)

  useEffect(() => {
    setTimeZoneSelect({ value: timeZone })
  }, [timeZone])

  // const [dateRange, setDateRange] = useState<DateRange | undefined>({
  //   from: new Date(year, month, day),
  //   to: addDays(new Date(year, month, day), 20),
  // })

  const form = useForm<TCreateHackathonSchema>({
    resolver: zodResolver(createHackathonSchema),
    mode: 'onChange',
    defaultValues,
  })

  useEffect(() => {
    if (hackathon) {
      form.setValue('name', hackathon.name)
      form.setValue('tagline', hackathon.tagline)
      form.setValue('email', hackathon.managerEmail)
      form.setValue('location', hackathon.location)
      form.setValue('startDate', hackathon.startDate)
      form.setValue('endDate', hackathon.endDate)
      //Tiptap content
      setDescriptionContent(hackathon.description || ' ')
      setRequirementContent(hackathon.requirements || ' ')
      setRulesContent(hackathon.rules || ' ')
      setResourcesContent(hackathon.resources || ' ')
      setJudgesContent(hackathon.judges || ' ')
      setPartnersContent(hackathon.partners || ' ')
      setPrizeList(hackathon.prizes)
      setTimeZone(hackathon.timeZone)
      console.log('descriptionContent', typeof descriptionContent)
    }
  }, [
    hackathon,
    form,
    setDescriptionContent,
    setRequirementContent,
    setRulesContent,
    setResourcesContent,
    setJudgesContent,
    setPartnersContent,
    setPrizeList,
    setTimeZone,
  ])

  // useEffect(() => {
  //   async function getHackathonById(hackathonId: string) {
  //     try {
  //       const res = await fetch('/api/manage/hackathons', {
  //         method: 'POST',
  //         body: JSON.stringify({ hackathonId }),
  //       })
  //       const data = await res.json()
  //       setData(data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   getHackathonById(hackathonId)
  // }, [hackathonId, name, tagline, email, location, startDate, endDate])

  const onSubmit = async (data: TCreateHackathonSchema) => {
    const formData = {
      ...data,
      managerEmail: data.email,
      description: descriptionContent,
      requirements: requirementContent,
      rules: rulesContent,
      resources: resourcesContent,
      judges: judgesContent,
      partners: partnersContent,
      prizes: prizeList,
      timeZone: timeZone,
      hackathonId: hackathon.id,
    }

    try {
      const res = await fetch('/api/manage/hackathons', {
        method: 'PUT',
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.refresh()
        toast({
          title: 'Success!',
          description: 'Updated your hackathon.',
        })
      }
    } catch (error) {
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
      <div className="space-y-8">
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

        {descriptionContent && (
          <div>
            <h1 className="mb-2 text-md font-semibold">Description</h1>
            <Tiptap
              content={descriptionContent}
              setContent={setDescriptionContent}
              placeholder="Description of the hackathon. e.g. Introduction, about the company, schedules."
            />
            <p className="text-sm text-slate-100 mt-2">
              Description of the hackathon. e.g. Introduction, about the
              company, schedules.
            </p>
          </div>
        )}
        {requirementContent && (
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
        )}
        {rulesContent && (
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
        )}
        {resourcesContent && (
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
        )}
        {judgesContent && (
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
        )}
        {partnersContent && (
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
        )}

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
            className="flex items-center gap-2 mt-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create prize
          </Button>
        </div>

        <Card className="w-fit">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <Label htmlFor="date" className="shrink-0">
                    Pick start and end dates
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-md">
                              Start date
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="text-black font-bold text-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-md">End date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="text-black font-bold text-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date" className="shrink-0">
                    Pick a time zone
                  </Label>
                  <TimezoneSelect
                    value={timeZoneSelect}
                    onChange={(obj) => setTimeZone(obj.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <DateAndTimeZonePicker
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          date={dateRange}
          setDate={setDateRange}
        /> */}

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="p-6 text-lg"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update
          </Button>
          <div
            className="font-bold text-red-500 underline cursor-pointer text-center ml-6 text-lg"
            onClick={() => router.push('/manager')}
          >
            Cancel
          </div>
        </div>
      </div>
    </Form>
  )
}
