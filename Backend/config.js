import dotenv from "dotenv"

dotenv.config()

const envType = process.env.NODE_ENV === "development"

export default {
  port: envType ? process.env.PORT_Local : process.env.PORT_Prod,
  ORIGIN: process.env.CORS_ORIGIN,
  DB_PORT: process.env.DB_PORT,
  DB_CONN_STRING: process.env.DB_CONN_STRING,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  AUTH_ENDPOINT: process.env.AUTH_ENDPOINT,
  TOKEN_ENDPOINT: process.env.TOKEN_ENDPOINT,
  USERINFO_ENDPOINT: process.env.USERINFO_ENDPOINT
}
