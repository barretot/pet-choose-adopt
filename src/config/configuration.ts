export default () => ({
  port: process.env.PORT || 3333,
  dataBaseUrl: process.env.DATABASE_URL,
})
