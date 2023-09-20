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

type EditProjectFormValues = z.infer<typeof editProjectSchema>
const defaultValues: Partial<EditProjectFormValues> = {}
export default function EditProjectForm({
  userId,
  projectId,
}: {
  userId: string
  projectId: string
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
  const [storyEditorText, setStoryEditorText] = useState<string>('')

  useEffect(() => {
    const getProjectByPid = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`)
        if (res.ok) {
          const data = await res.json()
          form.setValue('name', data.name)
          form.setValue('pitch', data.pitch)
          form.setValue('techStack', data.techStack)
          form.setValue('repositoryUrl', data.repositoryUrl)
          form.setValue('videoUrl', data.videoUrl)
          setStoryEditorText(data.story)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (projectId) {
      getProjectByPid()
    }
  }, [])

  const onSubmit = async (data: TEditProjectSchema) => {
    if (!projectId) {
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
      projectId,
      userId,
    }
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      })
      // console.log(res)
      if (res.ok) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            editorText={storyEditorText}
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
      </form>
    </Form>
  )
}
