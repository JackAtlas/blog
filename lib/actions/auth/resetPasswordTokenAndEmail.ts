'use server'

import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import crypto from 'crypto'

export async function resetPasswordTokenAndEmail(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: '邮箱不能为空' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) return { error: null } // 无论用户是否存在，都返回成功，避免暴露用户信息

    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    await prisma.passwordResetToken.deleteMany({
      where: { email }
    })

    await prisma.passwordResetToken.create({
      data: {
        email,
        tokenHash: tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15)
      }
    })

    const resetUrl = `${process.env.APP_URL}/reset-password/confirm?token=${token}`

    const { data, error } = await resend.emails.send({
      from: 'JackAtlas <noreply@jackatlas.xyz>',
      to: email,
      subject: '重置密码',
      html: `<p>您请求了重置密码，请点击以下链接重置您的密码：</p>
           <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">重置密码</a>
           <p>如果您没有请求重置密码，请忽略此邮件。</p>
           <p>此链接将在 <strong>15 分钟</strong>后过期。</p>
         `
    })

    if (error) {
      console.error('Resend error:', error)
      return { error: '发送重置密码邮件失败' }
    }

    console.log('Email sent:', data?.id)

    return { success: true }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : '发送重置密码邮件失败，未知错误'
    }
  }
}
