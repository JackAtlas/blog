import COS from 'cos-nodejs-sdk-v5'

export const cos = new COS({
  SecretId: process.env.QCLOUD_SECRETID!,
  SecretKey: process.env.QCLOUD_SECRETKEY!
})

export const BUCKET = process.env.QCLOUD_COS_BUCKET!
export const REGION = process.env.QCLOUD_COS_REGION!
export const COS_DOMAIN = process.env.QCLOUD_COS_DOMAIN!
