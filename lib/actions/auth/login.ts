'use server'

import { signIn } from '@/auth'

export const login = async (
  formData: FormData
): Promise<{ error: string | null }> => {
  const email = formData.get('email')?.toString().toLowerCase().trim()
  const password = formData.get('password')?.toString().trim()

  if (!email || !password) {
    return { error: '邮箱和密码不能为空' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    return { error: null }
  } catch (err: any) {
    if (err?.type === 'CredentialsSignin') {
      return { error: '邮箱或密码错误。' }
    }

    console.log({ err })
    return { error: '出错了，请稍后再试。' }
  }
}
