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
import { Button } from './ui/button'
import { Input } from './ui/input'
import Tiptap from './richTextEditor'
import { useRouter } from 'next/navigation'
import { PrizeCard } from './prizeCard'
import CreatePrizeForm from './create-prize-form'
import TimezoneSelect from 'react-timezone-select'
import { Icons } from './ui/ui-icons'
import { useToast } from './ui/use-toast'
import { Label } from '@radix-ui/react-label'
import { Card, CardContent } from './ui/card'
import { PlusCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { Dialog, DialogContent } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import parse from 'html-react-parser'
import { Separator } from './ui/separator'
import LaunchHackathonDialog from './launch-hackathon-dialog'

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
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false)
  const [openLaunchDialog, setOpenLaunchDialog] = useState(false)
  const [isLaunched, setIsLaunched] = useState(false)

  const [timeZoneSelect, setTimeZoneSelect] = useState<any>(timeZone)

  useEffect(() => {
    setTimeZoneSelect({ value: timeZone })
  }, [timeZone])

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
      setIsLaunched(hackathon.launched)
      setDescriptionContent(hackathon.description || ' ')
      setRequirementContent(hackathon.requirements || ' ')
      setRulesContent(hackathon.rules || ' ')
      setResourcesContent(hackathon.resources || ' ')
      setJudgesContent(hackathon.judges || ' ')
      setPartnersContent(hackathon.partners || ' ')
      setPrizeList(hackathon.prizes)
      setTimeZone(hackathon.timeZone)
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

  const handleClickPreview = () => {
    setOpenPreviewDialog(true)
  }

  const handleClickLaunch = () => {
    setOpenLaunchDialog((prev) => !prev)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center1">
          <Button
            className="text-xl font-extrabold w-fit px-6 py-6 hover:bg-slate-100 hover:text-slate-950 font-mono"
            onClick={handleClickPreview}
          >
            Preview
          </Button>

          <TooltipProvider>
            <Tooltip delayDuration={30}>
              <TooltipTrigger asChild>
                <Button className="rounded-full w-5 h-5 -px-2 -py-2 font-extrabold text-lg text-slate-700 bg-slate-300 hover:text-slate-100 hover:bg-slate-400">
                  ?
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-52 text-md font-medium">
                  Please update the hackathon before preview to see the changes.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {isLaunched ? (
          <div className="flex flex-col text-center">
            <h1 className="text-md font-bold">Your hackathon is launched.</h1>
            <p className="text-md font-bold">Thank you.</p>
          </div>
        ) : (
          <Button
            className="text-xl font-extrabold w-fit bg-lime-600 px-6 py-6"
            onClick={handleClickLaunch}
          >
            🚀 Launch Hackathon
          </Button>
        )}
      </div>
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
                isCreator={true}
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
                isCreator={true}
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
                isCreator={true}
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
                isCreator={true}
              />
              <p className="text-sm text-slate-100 mt-2">
                Resources for the hackathon that can be helpful for
                participants. e.g. technical support tools, links, additional
                documents, etc.
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
                isCreator={true}
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
                isCreator={true}
              />
              <p className="text-sm text-slate-100 mt-2">
                Information of partners. e.g. name, description, link.
              </p>
            </div>
          )}

          <div>
            <h1 className="mb-1 text-lg font-semibold dark:text-white">
              Prizes
            </h1>
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
              <div className="flex flex-col md:flex-row items-center gap-6 ">
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
                <div className="flex flex-col gap-2 min-w-[240px] ">
                  <Label htmlFor="date" className="shrink-0">
                    Pick a time zone
                  </Label>
                  <TimezoneSelect
                    value={timeZoneSelect}
                    onChange={(obj) => setTimeZone(obj.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

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

      <Dialog open={openPreviewDialog} onOpenChange={setOpenPreviewDialog}>
        <DialogContent className="bg-slate-700 container sm:min-w-[500px] md:min-w-[600px] lg:min-w-[800px] xl:min-w-[1200px] h-full    overflow-y-scroll">
          <div className="h-full px-4 py-6 lg:px-8 w-full justify-center">
            {hackathon && (
              <Tabs
                defaultValue="overview"
                className="h-full space-y-6 w-full "
              >
                <div className="flex items-center justify-center">
                  <TabsList className="flex py-6 bg-slate-300">
                    <TabsTrigger
                      value="overview"
                      className="relative text-xl px-6 rounded-lg data-[state=active]:bg-orange-300 data-[state=active]:font-bold"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="rules"
                      className="text-xl px-6 rounded-lg data-[state=active]:bg-orange-300 data-[state=active]:font-bold"
                    >
                      Rules
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="text-xl px-6 rounded-lg data-[state=active]:bg-orange-300 data-[state=active]:font-bold"
                    >
                      Resources
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value="overview"
                  className="border-none p-0 outline-none w-full flex flex-col justify-center"
                >
                  <div className="flex items-center justify-center mt-6">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-semibold tracking-tight">
                        {hackathon.name}
                      </h2>
                      <p className="text-2xl text-muted-foreground text-center">
                        {hackathon.tagline}
                      </p>
                    </div>
                  </div>
                  {/* <div className="text-lg flex mx-auto gap-4 w-full justify-center mt-6 items-center">
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="font-semibold">Start Date:</div>
                    {hackathon.startDate}
                  </div>
                  <div className="flex gap-4">
                    <div className="font-semibold">End Date:</div>
                    {hackathon.endDate}
                  </div>
                </div>
                <Badge
                  className={`py-2  w-fit ${
                    progress.isRunning ? 'bg-green-600' : 'bg-sky-600'
                  }`}
                >
                  <span className="w-full text-center text-lg">
                    {progress.status}
                  </span>
                </Badge>
              </div> */}

                  <div className="mt-5 text-xl flex flex-col py-6 mx-10 lg:mx-20">
                    {parse(hackathon.description)}
                  </div>
                  <Separator className="my-2 border border-slate-300 " />
                  <div className=" text-xl flex flex-col py-6 mx-10 lg:mx-20">
                    <h1 className="uppercase tracking-wide font-bold">
                      Location
                    </h1>
                    <h6 className="mt-3">{hackathon.location}</h6>
                  </div>
                  <Separator className="my-2 border border-slate-300" />
                  <div className=" text-xl flex flex-col py-6 mx-10 lg:mx-20">
                    <h1 className="uppercase tracking-wide font-bold">
                      Requirements
                    </h1>
                    <div className="mt-3">{parse(hackathon.requirements)}</div>
                  </div>
                  <Separator className="my-2 border border-slate-300" />
                  <div className="text-xl flex flex-col py-6 mx-10 lg:mx-20">
                    <h1 className="uppercase tracking-wide font-bold">
                      Prizes
                    </h1>
                    <div className="mt-3 flex gap-6 w-full">
                      {hackathon.prizes &&
                        Array.isArray(hackathon.prizes) &&
                        hackathon.prizes.map((prize: any, index: number) => {
                          return (
                            <div className="w-full mx-auto" key={index}>
                              <div>🏆 {prize.name}</div>
                              <div>🪙 ${prize.value}</div>
                              <div>
                                {prize.numberOfWinningTeams} winning teams
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                  <Separator className="my-2 border border-slate-300" />
                  <div className="text-xl flex flex-col py-6 mx-10 lg:mx-20">
                    <h1 className="uppercase tracking-wide font-bold">
                      Judges
                    </h1>
                    <div className="mt-3">{parse(hackathon.judges)}</div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="rules"
                  className="border-none p-0 outline-none w-full flex flex-col justify-center "
                >
                  <div className="mt-3 text-lg">{parse(hackathon.rules)}</div>
                </TabsContent>
                <TabsContent
                  value="resources"
                  className="border-none p-0 outline-none w-full flex flex-col justify-center "
                >
                  <div className="mt-3 text-lg">
                    {parse(hackathon.resources)}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <LaunchHackathonDialog
        open={openLaunchDialog}
        onOpenChange={setOpenLaunchDialog}
        setOpenLaunchDialog={setOpenLaunchDialog}
        hackathonId={hackathon.id}
        setIsLaunched={setIsLaunched}
      />
    </>
  )
}
