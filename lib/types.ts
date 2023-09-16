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

export const createHackathonSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  tagline: z.string().optional(),
  email: z.string().email().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const createPrizeSchema = z.object({
  name: z.string(),
  value: z.string(),
  numberOfWinningTeams: z.string(),
  description: z.string(),
})

export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TSignInSchema = z.infer<typeof signInSchema>
export type TCreateHackathonSchema = z.infer<typeof createHackathonSchema>
export type TCreatePrizeSchema = z.infer<typeof createPrizeSchema>
//todo add number of characters limit to name and tagline
