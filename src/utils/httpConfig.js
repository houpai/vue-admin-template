const serviceHost =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.13/im_web/'
    : 'http://channel.51vip.biz/im_web/'

//便于使用多个域名
const globalServiceHost = {}

export { serviceHost, globalServiceHost }
