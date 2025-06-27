import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'

const clientId =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_AUTH_GITHUB_ID!
    : process.env.DEV_AUTH_GITHUB_ID!

const clientSecret =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_AUTH_GITHUB_SECRET!
    : process.env.DEV_AUTH_GITHUB_SECRET!

export default {
  providers: [
    GitHub({
      clientId,
      clientSecret
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) return '/unauthorized'
      const whitelist_emails = process.env.WHITELIST_EMAILS || ''
      if (whitelist_emails.indexOf(profile.email) > -1) {
        return true
      } else {
        return '/unauthorized'
      }
    }
  }
} satisfies NextAuthConfig
