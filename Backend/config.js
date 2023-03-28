import dotenv from "dotenv"

dotenv.config()

export default {
  port: process.env.PORT,
  ORIGIN: process.env.ORIGIN
}
