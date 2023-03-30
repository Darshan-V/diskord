import dotenv from "dotenv"

dotenv.config()

const envType = process.env.NODE_ENV === "development"

export default {
  port: envType ? process.env.PORT_Local : process.env.PORT_Prod,
  ORIGIN: process.env.CORS_ORIGIN,
  DB_PORT: process.env.DB_PORT,
  DB_CONN_STRING: process.env.DB_CONN_STRING
}
