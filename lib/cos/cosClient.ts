import COS from 'cos-nodejs-sdk-v5'

export const cos = new COS({
  SecretId: process.env.QCLOUD_SECRETID!,
  SecretKey: process.env.QCLOUD_SECRETKEY!
})

export const BUCKET = process.env.QCLOUD_COS_BUCKET!
export const REGION = process.env.QCLOUD_COS_REGION!
export const COS_DOMAIN = process.env.QCLOUD_COS_DOMAIN!

export async function uploadToCOS(
  Body: Buffer,
  Key: string,
  options?: {
    contentType?: string
  }
) {
  await new Promise<void>((resolve, reject) => {
    cos.putObject(
      {
        Bucket: BUCKET,
        Region: REGION,
        Key,
        Body,
        ContentType: options?.contentType,
        ACL: 'public-read'
      },
      (err) => (err ? reject(err) : resolve())
    )
  })

  return `${COS_DOMAIN}/${Key}`
}
