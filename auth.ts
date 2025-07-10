import NextAuth from 'next-auth'
import { config } from '@/app/api/auth/[...nextauth]/route'

export const { auth } = NextAuth(config)
