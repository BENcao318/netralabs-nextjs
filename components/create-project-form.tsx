'use client'

import { TCreateProjectSchema, createProjectSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
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

type CreatProjectFormValues = z.infer<typeof createProjectSchema>
const defaultValues: Partial<CreatProjectFormValues> = {}
export default function CreateProjectForm({
  userId,
  hackathonId,
}: {
  userId: string
  hackathonId: string
}) {
  const router = useRouter()
  const form = useForm<TCreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues,
    mode: 'onChange',
  })
  const animatedComponents = makeAnimated()
  const { toast } = useToast()

  const [storyContent, setStoryContent] = useState<string>('')
  const [storyEditorText, setStoryEditorText] = useState<string>('')

  const onSubmit = async (data: TCreateProjectSchema) => {
    const projectData = {
      ...data,
      story: storyContent,
      hackathonId,
      userId,
    }
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      })
      // console.log(res)
      if (res.ok) {
        toast({
          title: 'Success!',
          description: 'A new project has been created.',
        })
        router.push('/dashboard/projects')
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to create project',
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
          <h1 className="mb-2 text-md font-semibold">Description</h1>
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
                  {form.formState.errors.techStack && "Can't be blank"}
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
            Create
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
