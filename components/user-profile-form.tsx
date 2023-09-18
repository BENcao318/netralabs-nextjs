'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TUserProfileSchema, UserProfile, userProfileSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from './ui/use-toast'
import { useSession } from 'next-auth/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useRouter } from 'next/navigation'
import { options } from '@/lib/options.js'
import { MultiSelect } from './ui/multi-select'
import { Checkbox } from './ui/checkbox'

export default function UserProfileForm({
  userId,
}: {
  userId: string | undefined
}) {
  const defaultValues: Partial<TUserProfileSchema> = {
    name: '',
    items: ['recents', 'home'],
  }
  // const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const { toast } = useToast()
  const { data: session, update } = useSession()
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const form = useForm<TUserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await fetch('/api/users/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
          }),
        })
        const data = await res.json()
        form.setValue('name', data.name)
        form.setValue('role', data.userPreference.role)
        if (data.skills) setSelected(data.specialties)
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  }, [userId, form, setSelected])

  const onSubmit = async (data: TUserProfileSchema) => {
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name: data.name,
          role: data.role,
          techStack: selected,
        }),
      })
      if (res.ok) {
        await update({
          name: data.name,
        })
        toast({
          title: 'Success!',
          description: 'We have updated your profile.',
        })
      }
    } catch (error) {
      console.log(error)
    }
    toast
  }

  const specialtyList = [
    { value: 'Full-stack developer', label: 'Full-stack developer' },
    { value: 'Front-end developer', label: 'Front-end developer' },
    { value: 'Back-end developer', label: 'Back-end developer' },
    { value: 'UI Designer', label: 'UI Designer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'Business Manager', label: 'Business Manager' },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-1/2 min-w-[200px]">
              <FormLabel className="text-md">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="user name"
                  {...field}
                  className="text-black font-bold text-lg"
                />
              </FormControl>
              <FormDescription className="text-slate-300">
                Your user name will be displayed publicly
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-1/2 min-w-[200px]">
              <FormLabel className="text-md">Your specialty</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger className="text-slate-800 text-lg font-bold">
                    <SelectValue placeholder="Select a specialty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialtyList.map((item) => (
                    <SelectItem
                      className="text-md"
                      value={item.value}
                      key={item.label}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-slate-300">
                What role do you want to play in a project?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-1/2 min-w-[200px]">
          <h1 className="mb-2 text-md">Tech stack</h1>
          <div>
            <MultiSelect
              options={options}
              selected={selected}
              onChange={setSelected}
            />
          </div>
          <p className="mt-2 text-sm text-slate-300">
            What languages, frameworks, databases are you familiar with?
          </p>
        </div>

        <div className="flex gap-10 ">
          <Button type="submit" className="text-lg">
            Update profile
          </Button>
          <Button
            variant="destructive"
            className="text-lg"
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  )
}
