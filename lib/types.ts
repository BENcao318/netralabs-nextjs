import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email(),
    password: z
      .string()
      .min(10, 'Password must be at least 10 characters')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
        message:
          'Password must contain at least one letter, one number, and one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const createHackathonSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    tagline: z.string().optional(),
    email: z.string().email().optional(),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true
      return new Date(data.startDate) <= new Date(data.endDate)
    },
    {
      message: 'End date cannot be before start date',
      path: ['endDate'],
    }
  )

export const createProjectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  pitch: z.string().optional(),
  techStack: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  repositoryUrl: z.string().url().optional(),
  videoUrl: z
    .string()
    .url()
    .refine(
      (value) =>
        /^(?:(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|youtu.be\/|user\/\S+|playlist\?list=\S+)))([^\s\/?#]+)/.test(
          value
        ),
      { message: 'Only Vimeo or Youtube video links are acceptable.' }
    )
    .optional(),
})

export const createPrizeSchema = z.object({
  name: z.string(),
  value: z.string(),
  numberOfWinningTeams: z.string(),
  description: z.string(),
})

export const userProfileSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  // email: z.string().email(),
  role: z.object({
    value: z.string(),
    label: z.string(),
  }),
  items: z.array(z.string()),
  skills: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  // numberOfWinningTeams: z.string(),
  // description: z.string(),
})

export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TSignInSchema = z.infer<typeof signInSchema>
export type TCreateHackathonSchema = z.infer<typeof createHackathonSchema>
export type TCreatePrizeSchema = z.infer<typeof createPrizeSchema>
export type TUserProfileSchema = z.infer<typeof userProfileSchema>
export type TCreateProjectSchema = z.infer<typeof createProjectSchema>
export type Hackathon = {
  about: null
  company: null
  createdAt: Date
  creatorId: string
  description: string
  endDate: string
  id: string
  judges: string
  launched: boolean
  location: string
  managerEmail: string
  name: string
  partners: string
  prizes: any[]
  requirements: string
  resources: string
  rules: string
  startDate: string
  tagline: string
  timeZone: string
  updatedAt: Date
  isJoined?: boolean
  hasProject?: boolean
  projectId?: string
}

export type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

export type UserProfile = {
  id: string
  name: string
  email: string
  userPreference: {
    id: string
    role: string | null
    skills: string[] | null
    avatar: string | null
    company: string | null
  }
}

export type Prize = {
  id: string
  name: string
  value: string
  numberOfWinningTeams: string
  description: string
  isEditing?: boolean
}

//todo add number of characters limit to name and tagline
