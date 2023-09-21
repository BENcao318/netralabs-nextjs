'use client'

import { TEditProjectSchema, editProjectSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import Tiptap from './richTextEditor'
import { Button } from './ui/button'
import { Icons } from './ui/ui-icons'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import techStackOptions from '@/lib/techStackOptions.json'
import makeAnimated from 'react-select/animated'
import { useToast } from './ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import parse from 'html-react-parser'
import { Separator } from './ui/separator'

type EditProjectFormValues = z.infer<typeof editProjectSchema>
const defaultValues: Partial<EditProjectFormValues> = {}
export default function EditProjectForm({
  userId,
  project,
  setProject,
}: {
  userId: string
  project: any
  setProject: any
}) {
  const router = useRouter()
  const form = useForm<TEditProjectSchema>({
    resolver: zodResolver(editProjectSchema),
    defaultValues,
    mode: 'onChange',
  })
  const animatedComponents = makeAnimated()
  const { toast } = useToast()

  const [storyContent, setStoryContent] = useState<string>('')

  useEffect(() => {
    if (project) {
      form.setValue('name', project.name)
      form.setValue('pitch', project.pitch)
      form.setValue('techStack', project.techStack)
      form.setValue('repositoryUrl', project.repositoryUrl)
      form.setValue('videoUrl', project.videoUrl)
      setStoryContent(project.story)
    }
  }, [project])

  const onSubmit = async (data: TEditProjectSchema) => {
    if (!project.id) {
      toast({
        variant: 'destructive',
        title: 'No project id found',
        description: 'Please select a project first.',
      })
      return
    }

    const projectData = {
      ...data,
      story: storyContent,
      projecId: project.id,
      userId,
    }
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      })

      if (res.ok) {
        setProject({
          ...project,
          name: projectData.name,
          pitch: projectData.pitch,
          techStack: projectData.techStack,
          repositoryUrl: projectData.repositoryUrl,
          videoUrl: projectData.videoUrl,
          story: projectData.story,
        })
        toast({
          title: 'Success!',
          description: 'Your project has been updated.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to update project',
          description: res.statusText,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-4 -mt-2">
            <Button className="text-xl font-extrabold w-fit px-6 py-6 hover:bg-slate-100 hover:text-slate-950 font-mono">
              Preview
            </Button>
            <p className="w-40 text-sm">Check the display of your project</p>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-slate-700 container sm:min-w-[500px] md:min-w-[600px] lg:min-w-[800px] xl:min-w-[1000px] h-full overflow-scroll	">
          <DialogHeader className="text-slate-900">
            <DialogTitle className="text-3xl font-bold text-slate-100 text-center">
              {project.name}
            </DialogTitle>
            <DialogDescription className="text-md font-normal text-slate-300 text-center">
              {project.pitch}
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-2" />
          <div className="break-all">
            <h1 className="font-extrabold text-xl">Story:</h1>
            <div className="mt-3">{parse(project.story)}</div>
          </div>
          <Separator className="mt-2" />
          <div className="break-all">
            <h1 className="font-extrabold text-xl">Tech stack:</h1>
            <div className="flex gap-3 mt-2">
              {project.techStack.map((tech: any) => {
                return (
                  <div
                    className="px-2 py-1 bg-sky-600 rounded-lg text-slate-100 font-medium"
                    key={tech.label}
                  >
                    {tech.value}
                  </div>
                )
              })}
            </div>
          </div>
          <Separator className="mt-2" />
          <div className="break-all">
            <h1 className="font-extrabold text-xl">Github repository:</h1>
            <div className="flex gap-3 mt-2">{project.repositoryUrl}</div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Project name"
                  {...field}
                  className="text-black text-lg w-1/2"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                This is the name of your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pitch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Project pitch/tagline</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pitch line"
                  {...field}
                  className="text-black text-lg w-1/2"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                Create a pitch line for your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h1 className="mb-2 text-md font-semibold">Story</h1>
          <Tiptap
            content={storyContent}
            setContent={setStoryContent}
            placeholder="Description of the hackathon. e.g. Introduction, about the company, schedules."
          />
          <p className="text-sm text-slate-100 mt-2">
            Please write down the story of the project, what it does, how did
            you build your project, what challenges you faced, what you learned,
            accomplishments that you're proud of, what's next for your project.
          </p>
        </div>

        <div>
          <h1 className="mb-2 text-md font-semibold">Tech stack</h1>
          <Controller
            name="techStack"
            control={form.control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  isMulti
                  options={techStackOptions}
                  placeholder="Select tags..."
                  components={animatedComponents}
                  className="text-black font-semibold"
                  instanceId={field.name}
                />
                <p className="mt-2 text-red-600">
                  {form.formState.errors.techStack &&
                    form.formState.errors.techStack.message}
                </p>
              </>
            )}
          />
          <p className="text-sm text-slate-100 mt-2">
            What languages, frameworks, databases did you use?
          </p>
        </div>
        <FormField
          control={form.control}
          name="repositoryUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Repository link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Github link..."
                  {...field}
                  className="text-black text-lg w-full"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                Add link for your project repo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Video link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Youtube or Vimeo video URL..."
                  {...field}
                  className="text-black text-lg w-full"
                />
              </FormControl>
              <FormDescription className="text-slate-100">
                Video link to showcase your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
            onClick={() => router.back()}
          >
            Cancel
          </div>
        </div>
      </div>
    </Form>
  )
}
